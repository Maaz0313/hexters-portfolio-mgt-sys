import React, { useState, useRef, useEffect } from "react";

interface FieldsetCheckboxesProps {
  title: string;
  items: Array<{
    id: string;
    label: string;
  }>;
  selectedItems: string[];
  onSelectionChange: (selectedItems: string[]) => void;
  themeColor?: string;
  textColor?: string;
  minWidth?: number;
}

const FieldsetCheckboxes: React.FC<FieldsetCheckboxesProps> = ({
  title,
  items,
  selectedItems = [],
  onSelectionChange,
  themeColor = "#4ecdc4",
  textColor = "#ffffff",
  minWidth = 200, // Default minimum width
}) => {
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const [dropdownWidth, setDropdownWidth] = useState<number>(minWidth);
  const [displayTitle, setDisplayTitle] = useState(title);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const legendRef = useRef<HTMLLegendElement>(null);
  const fieldsetRef = useRef<HTMLFieldSetElement>(null);

  // Calculate the width needed for the longest item
  useEffect(() => {
    // Create a temporary span to measure text width
    const span = document.createElement('span');
    span.style.visibility = 'hidden';
    span.style.position = 'absolute';
    span.style.whiteSpace = 'nowrap';
    span.style.fontFamily = getComputedStyle(document.body).fontFamily;
    document.body.appendChild(span);

    // Find the longest label
    let maxWidth = minWidth;

    // Check the title length first
    span.textContent = title;
    let titleWidth = span.offsetWidth + 50; // Add padding
    maxWidth = Math.max(maxWidth, titleWidth);

    // Check selected items display text
    if (selectedItems.length === 1) {
      const selected = items.find(item => item.id === selectedItems[0]);
      if (selected) {
        span.textContent = `${title}: ${selected.label}`;
        const selectedWidth = span.offsetWidth + 50;
        maxWidth = Math.max(maxWidth, selectedWidth);
      }
    } else if (selectedItems.length > 1) {
      span.textContent = `${title}: ${selectedItems.length} selected`;
      const multiSelectedWidth = span.offsetWidth + 50;
      maxWidth = Math.max(maxWidth, multiSelectedWidth);
    }

    // Check all item labels
    items.forEach(item => {
      span.textContent = item.label;
      const width = span.offsetWidth + 70; // Add padding for checkbox and margins
      maxWidth = Math.max(maxWidth, width);
    });

    document.body.removeChild(span);

    // Add extra padding to ensure consistent width
    maxWidth += 30;

    setDropdownWidth(maxWidth);

    // Apply the width to the fieldset and legend
    if (fieldsetRef.current) {
      fieldsetRef.current.style.width = `${maxWidth}px`;
      fieldsetRef.current.style.minWidth = `${maxWidth}px`;
    }

    if (legendRef.current) {
      legendRef.current.style.width = `${maxWidth}px`;
      legendRef.current.style.minWidth = `${maxWidth}px`;
    }
  }, [items, minWidth, title, selectedItems]);

  // Close dropdown when component mounts
  useEffect(() => {
    setIsHidden(true);
  }, []);

  // Update display title when selectedItems changes
  useEffect(() => {
    if (selectedItems && selectedItems.length > 0) {
      if (selectedItems.length === 1) {
        const selected = items.find(item => item.id === selectedItems[0]);
        if (selected) {
          setDisplayTitle(`${title}: ${selected.label}`);
        } else {
          setDisplayTitle(title);
        }
      } else {
        setDisplayTitle(`${title}: ${selectedItems.length} selected`);
      }
    } else {
      setDisplayTitle(title);
    }
  }, [selectedItems, items, title]);

  const toggleHidden = () => {
    setIsHidden(!isHidden);
  };

  const handleCheckboxChange = (itemId: string, checked: boolean) => {
    let newSelectedItems;

    if (checked) {
      // Add item to selection
      newSelectedItems = [...selectedItems, itemId];
    } else {
      // Remove item from selection
      newSelectedItems = selectedItems.filter(id => id !== itemId);
    }

    onSelectionChange(newSelectedItems);
  };

  // Use inline style for dynamic colors instead of template literals in className
  const textColorStyle = { color: textColor };
  const borderStyle = { borderColor: themeColor };
  const accentStyle = { accentColor: themeColor };

  return (
    <fieldset
      ref={fieldsetRef}
      className="relative m-0 p-0 inline-block w-full"
      style={{
        ...textColorStyle,
        height: '48px', // Fixed height to ensure consistent alignment
        boxSizing: 'border-box'
      }}
    >
      <legend
        ref={legendRef}
        onClick={toggleHidden}
        className="caret-down flex h-12 cursor-pointer items-center border-0 border-b py-4 pr-8 pl-4 whitespace-nowrap overflow-hidden text-ellipsis w-full"
        style={{
          ...borderStyle,
          boxSizing: 'border-box'
        }}
      >
        {displayTitle}
      </legend>
      <div
        ref={dropdownRef}
        className={`${
          isHidden
            ? "invisible h-0 p-0"
            : "absolute top-0 z-[3] flex max-h-[335px] flex-col gap-2 overflow-y-auto border-0 border-b bg-[#0a2550] bg-[right_center] p-4 [box-shadow:0_6px_12px_#0000004d] w-full"
        }`}
        style={{
          ...(!isHidden ? borderStyle : {}),
          boxSizing: 'border-box'
        }}
      >
        {items.map((item) => (
          <label
            key={item.id}
            htmlFor={`${item.id}`}
            className="flex cursor-pointer items-center gap-2 font-light py-1"
          >
            <input
              type="checkbox"
              className="size-6 shrink-0 cursor-pointer self-start border ring-0"
              style={{ ...accentStyle, borderColor: textColor }}
              name={`${item.id}`}
              id={`${item.id}`}
              checked={selectedItems.includes(item.id)}
              onChange={(e) => handleCheckboxChange(item.id, e.target.checked)}
            />
            <span className="text-ellipsis overflow-hidden">{item.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
};

export default FieldsetCheckboxes;
