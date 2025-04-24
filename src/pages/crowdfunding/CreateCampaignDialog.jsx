import React, { useState } from "react";

const CreateCampaignDialog = ({ open, onOpenChange }) => {
  const [campaignName, setCampaignName] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar os dados da campanha
    console.log({ campaignName, goalAmount, description });
    onOpenChange(false);  // Fechar o dialog após o envio
  };

  return (
    open && (
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg w-96">
          <h2 className="text-2xl mb-4">Create a New Campaign</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="campaignName" className="block mb-2">
                Campaign Name
              </label>
              <input
                type="text"
                id="campaignName"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="goalAmount" className="block mb-2">
                Goal Amount
              </label>
              <input
                type="number"
                id="goalAmount"
                value={goalAmount}
                onChange={(e) => setGoalAmount(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block mb-2">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="bg-gray-300 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Create Campaign
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default CreateCampaignDialog;
