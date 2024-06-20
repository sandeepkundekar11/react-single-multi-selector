import React from "react";
import "../css/singleSelect.css";
import { useEffect, useRef, useState } from "react";
import upArrow from "../Images/Up_arrow.png";
import downArrow from "../Images/Down_arrow.png";
const SingleSelect = ({ option = [], value, onHandleChange }) => {
  const [inputValue, setInputValue] = useState("");
  const [OptionArr, setOptionArr] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [searchedValue, setSearchedValue] = useState("");
  const [ImagUrl, setImageUrl] = useState(upArrow);
  const DropdownRef = useRef(null);
  const ToggleDropdown = () => {
    if (DropdownRef.current.classList.contains("dropdown")) {
      setSearchedValue("");
      DropdownRef.current.classList.replace("dropdown", "showDropdown");
      setImageUrl(downArrow);
    } else {
      DropdownRef.current.classList.replace("showDropdown", "dropdown");
      setImageUrl(upArrow);
    }
  };

  useEffect(() => {
    // setting the initial value
    setInputValue(value);
  }, [value]);
  //
  useEffect(() => {
    // modifing the option array based on option and selected value dependance
    let updatedArr = option.map((ele) => {
      return {
        value: ele.value,
        color: ele.value === selectedValue ? "white" : "black",
        bgcolor: ele.value === selectedValue ? "rgb(101, 164, 255)" : "",
      };
    });
    setOptionArr(updatedArr);
  }, [option, selectedValue]);

  return (
    <div
      className="container"
      onBlur={() => {
        setTimeout(() => {
          DropdownRef.current.classList.replace("showDropdown", "dropdown");
          setImageUrl(upArrow);
        }, 200);
      }}
    >
      <div className="InputBox">
        <input
          onFocus={ToggleDropdown}
          type="text"
          placeholder="select"
          value={inputValue}
          onChange={(e) => {
            setSelectedValue(e.target.value);
            setInputValue(e.target.value);
            setSearchedValue(e.target.value);
          }}
        />
        <button onClick={ToggleDropdown}>
          <img src={ImagUrl} alt="" />
        </button>
      </div>
      <div className="dropdown" ref={DropdownRef}>
        {OptionArr.length !== 0 &&
          OptionArr.filter((ele) => {
            return ele.value.toLowerCase().includes(searchedValue);
          }).map((ele, index) => {
            return (
              <div
                style={{ backgroundColor: ele.bgcolor, color: ele.color }}
                onClick={() => {
                  // setting the selected value
                  setSelectedValue(ele.value);
                  // calling the callback function
                  onHandleChange && onHandleChange(ele.value);
                  // setting the input value
                  setInputValue(ele.value);
                  DropdownRef.current.classList.replace(
                    "showDropdown",
                    "dropdown"
                  );
                  setImageUrl(upArrow);
                }}
                key={index}
              >
                {ele.value}
              </div>
            );
          })}

        {
          // for the empty array
          OptionArr.filter((ele) => {
            return ele.value.toLowerCase().includes(searchedValue);
          }).length < 1 && <div className="no_option">No Options</div>
        }
      </div>
    </div>
  );
};

export default SingleSelect;
