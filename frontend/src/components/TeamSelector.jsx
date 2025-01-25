// filepath: /c:/Users/NAVEEN/OneDrive/Desktop/FBP/frontend/src/components/TeamSelector.jsx
import React from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../ui/select';

const TeamSelector = ({ label, value, onValueChange, disabled, teams }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <Select value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectTrigger>
          <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent>
          {teams.map((team) => (
            <SelectItem key={team} value={team}>
              {team}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default TeamSelector;