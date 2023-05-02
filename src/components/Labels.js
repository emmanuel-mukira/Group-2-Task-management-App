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

export default Labels;
