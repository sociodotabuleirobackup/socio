
import React from "react"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function FilterSidebar({ filters, onChange }) {
  return (
    <Card className="w-64 p-6 sticky top-4 h-fit">
      <div className="space-y-6">
        {/* Tipo */}
        <div>
          <Label className="text-base">Tipo</Label>
          <RadioGroup
            value={filters.type}
            onValueChange={(value) =>
              onChange({ ...filters, type: value })
            }
            className="mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all">Todos</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="rental" id="rental" />
              <Label htmlFor="rental">Aluguel</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sale" id="sale" />
              <Label htmlFor="sale">Venda</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Faixa de Preço */}
        <div>
          <Label className="text-base">Faixa de Preço</Label>
          <div className="mt-2">
            <Slider
              value={filters.priceRange}
              min={0}
              max={1000}
              step={10}
              onValueChange={(value) =>
                onChange({ ...filters, priceRange: value })
              }
            />
            <div className="flex justify-between mt-2 text-sm text-gray-500">
              <span>R$ {filters.priceRange[0]}</span>
              <span>R$ {filters.priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Categoria */}
        <div>
          <Label className="text-base">Categoria</Label>
          <Select
            value={filters.category}
            onValueChange={(value) =>
              onChange({ ...filters, category: value })
            }
          >
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="strategy">Estratégia</SelectItem>
              <SelectItem value="family">Família</SelectItem>
              <SelectItem value="party">Party Game</SelectItem>
              <SelectItem value="cards">Cartas</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Disponibilidade */}
        <div>
          <Label className="text-base">Disponibilidade</Label>
          <RadioGroup
            value={filters.availability}
            onValueChange={(value) =>
              onChange({ ...filters, availability: value })
            }
            className="mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="avail-all" />
              <Label htmlFor="avail-all">Todos</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="available" id="available" />
              <Label htmlFor="available">Disponível Agora</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="upcoming" id="upcoming" />
              <Label htmlFor="upcoming">Em Breve</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </Card>
  )
}
