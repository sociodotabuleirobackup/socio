
import { storage } from '@/lib/firebase'
import { ref, uploadBytes, getDownloadURL, deleteObject, listAll } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'

// Upload file with progress tracking
export async function uploadFile(file, path, onProgress) {
  try {
    const fileExtension = file.name.split('.').pop()
    const fileName = `${uuidv4()}.${fileExtension}`
    const fullPath = `${path}/${fileName}`
    const storageRef = ref(storage, fullPath)

    // Upload file with progress monitoring
    const uploadTask = uploadBytes(storageRef, file)
    
    if (onProgress) {
      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          onProgress(progress)
        }
      )
    }

    await uploadTask
    const downloadURL = await getDownloadURL(storageRef)

    return {
      url: downloadURL,
      path: fullPath,
      fileName
    }
  } catch (error) {
    console.error('Error uploading file:', error)
    throw error
  }
}

// Delete file from storage
export async function deleteFile(path) {
  try {
    const storageRef = ref(storage, path)
    await deleteObject(storageRef)
    return true
  } catch (error) {
    console.error('Error deleting file:', error)
    throw error
  }
}

// List all files in a directory
export async function listFiles(path) {
  try {
    const storageRef = ref(storage, path)
    const res = await listAll(storageRef)
    
    const files = await Promise.all(
      res.items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef)
        return {
          name: itemRef.name,
          path: itemRef.fullPath,
          url
        }
      })
    )

    return files
  } catch (error) {
    console.error('Error listing files:', error)
    throw error
  }
}

// Get file metadata
export async function getFileMetadata(path) {
  try {
    const storageRef = ref(storage, path)
    const metadata = await getMetadata(storageRef)
    return metadata
  } catch (error) {
    console.error('Error getting file metadata:', error)
    throw error
  }
}

// Update file metadata
export async function updateFileMetadata(path, metadata) {
  try {
    const storageRef = ref(storage, path)
    const updatedMetadata = await updateMetadata(storageRef, metadata)
    return updatedMetadata
  } catch (error) {
    console.error('Error updating file metadata:', error)
    throw error
  }
}
