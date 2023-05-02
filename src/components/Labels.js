import React from 'react';

const Labels = () => {
  const [selectedLabel, setSelectedLabel] = React.useState(null);
  const [selectedPriority, setSelectedPriority] = React.useState('low');

  const handleLabelSelected = (label) => {
    setSelectedLabel(label);
  };

  const handleLabelAdded = () => {
    setSelectedLabel(null);
  };

  const handlePrioritySelected = (priority) => {
    setSelectedPriority(priority);
  };

  return (
    <div>
      <AddLabelForm onLabelAdded={handleLabelAdded} />
      <LabelDropdown onSelectLabel={handleLabelSelected} />
      <PriorityDropdown onSelectPriority={handlePrioritySelected} />
      {selectedLabel && (
        <p>
          Selected Label: {selectedLabel.name} <br/> Priority: {selectedPriority}
        </p>
      )}
    </div>
  );
};

const labels = [
    { id: 1, name: 'Groceries' },
    { id: 2, name: 'Work' },
    { id: 3, name: 'Chores' },
    { id: 4, name: 'Shopping' },
    { id: 5, name: 'Project' }
];


const addNewLabel = (labelName) => {
const newLabel = {
    id: labels.length + 1,
    name: labelName
};
labels.push(newLabel);
};

const LabelDropdown = ({ onSelectLabel }) => {
    const handleLabelSelected = (event) => {
      const selectedLabelId = parseInt(event.target.value);
      const selectedLabel = labels.find((label) => label.id === selectedLabelId);
      onSelectLabel(selectedLabel);
    };
  
    return (
      <select onChange={handleLabelSelected}>
        <option value="">Select a label</option>
        {labels.map((label) => (
          <option key={label.id} value={label.id}>
            {label.name}
          </option>
        ))}
      </select>
    );
};

export default Labels;
