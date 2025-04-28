import React, { useState, useRef, useEffect } from "react";

interface FieldsetDropdownProps {
  title: string;
  items: Array<{
    id: string;
    label: string;
    checked?: boolean;
  }>;
  selectedItem?: string;
  onSelect?: (itemId: string) => void;
  onChange?: (itemId: string, checked: boolean) => void;
  themeColor?: string;
  textColor?: string;
}

const FieldsetDropdown: React.FC<FieldsetDropdownProps> = ({
  title,
  items,
  selectedItem,
  onSelect,
  onChange,
  themeColor = "#300A44",
  textColor = "#524e57",
}) => {
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const [legendWidth, setLegendWidth] = useState('auto');
  const [displayTitle, setDisplayTitle] = useState(title);
  const dropdownRef = useRef(null);

  // Update display title when selectedItem changes
  useEffect(() => {
    if (selectedItem) {
      const selected = items.find(item => item.id === selectedItem);
      if (selected) {
        setDisplayTitle(`${title}: ${selected.label}`);
      } else {
        setDisplayTitle(title);
      }
    } else {
      setDisplayTitle(title);
    }
  }, [selectedItem, items, title]);

  const toggleHidden = () => {
    setIsHidden(!isHidden);
  };

  const handleChange = (itemId: string, checked: boolean) => {
    if (onChange) {
      onChange(itemId, checked);
    }
  };

  const handleSelect = (itemId: string) => {
    if (onSelect) {
      onSelect(itemId);
      setIsHidden(true);
    }
  };

  useEffect(() => {
    if (!isHidden && dropdownRef.current) {
      // Get the width of the dropdown content
      const dropdownWidth = dropdownRef.current.scrollWidth;
      // Set the legend width to match the dropdown width
      setLegendWidth(`${dropdownWidth}px`);
    } else if (isHidden) {
      // Reset to auto when closed
      setLegendWidth('auto');
    }
  }, [isHidden]);

  // Use inline style for dynamic colors instead of template literals in className
  const textColorStyle = { color: textColor };
  const borderStyle = { borderColor: themeColor };
  const accentStyle = { accentColor: themeColor };

  return (
    <fieldset className="relative m-0 p-0 inline-block w-max" style={textColorStyle}>
      <legend
        onClick={toggleHidden}
        className="caret-down flex h-12 cursor-pointer items-center border-0 border-b py-4 pr-8 pl-4 whitespace-nowrap w-full"
        style={borderStyle}
      >
        {displayTitle}
      </legend>
      <div
        ref={dropdownRef}
        className={`${
          isHidden
            ? "invisible h-0 p-0"
            : "absolute top-0 z-[3] flex max-h-[335px] w-full flex-col gap-2 overflow-y-scroll border-0 border-b bg-white bg-[right_center] p-4 [box-shadow:0_6px_12px_#0000004d]"
        }`}
        style={!isHidden ? borderStyle : undefined}
      >
        {items.map((item) => (
          onSelect ? (
            // Radio button style for single selection
            <div
              key={item.id}
              className="flex cursor-pointer items-center gap-2 font-light whitespace-nowrap py-1"
              onClick={() => handleSelect(item.id)}
            >
              <div
                className={`w-4 h-4 rounded-full border ${selectedItem === item.id ? 'bg-[#4716ed] border-[#4716ed]' : 'border-gray-400'}`}
              />
              <span>{item.label}</span>
            </div>
          ) : (
            // Checkbox style for multi-selection
            <label
              key={item.id}
              htmlFor={`${item.id}`}
              className="flex cursor-pointer items-center gap-2 font-light whitespace-nowrap"
            >
              <input
                type="checkbox"
                className="size-6 shrink-0 cursor-pointer self-start border ring-0"
                style={{ ...accentStyle, borderColor: textColor }}
                name={`${item.id}`}
                id={`${item.id}`}
                checked={item.checked || false}
                onChange={(e) => handleChange(item.id, e.target.checked)}
              />
              <span>{item.label}</span>
            </label>
          )
        ))}
      </div>
    </fieldset>
  );
};

export default FieldsetDropdown;

