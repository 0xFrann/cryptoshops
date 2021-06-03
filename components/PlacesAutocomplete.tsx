import { useEffect, forwardRef, Ref } from "react";
import CloseIcon from "../assets/close-icon.svg";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import { ChangeHandler } from "react-hook-form";
import { TLocation } from "../types";

const WrapperStyle = "relative m-2";
const InputStyle = "w-full py-2 px-4 h-12 rounded-3xl outline-none focus:shadow-md";
const ListWrapperStyle =
  "absolute top-14 h-24 w-full bg-white rounded-lg overflow-hidden shadow-xl z-50";
const ListStyle = "h-full overflow-y-auto py-2";
const ItemStyle = "py-2 px-3 m-0 text-left";
const InputCloseIconStyle = "absolute top-4 right-3";

interface IPlacesAutocomplete extends Partial<HTMLInputElement> {
  onSelect?: (val: TLocation) => void;
  onChange?: ChangeHandler;
  onBlur?: ChangeHandler;
}

const PlacesAutocomplete = forwardRef(
  (
    {
      name,
      defaultValue = "",
      onSelect = () => {},
      onChange,
      onBlur,
      className,
    }: IPlacesAutocomplete,
    ref?: Ref<HTMLInputElement>
  ): React.ReactElement => {
    const {
      ready,
      value,
      suggestions: { status, data },
      setValue,
      clearSuggestions,
    } = usePlacesAutocomplete({
      requestOptions: {
        componentRestrictions: {
          country: "ar",
        },
      },
      debounce: 300,
    });
    const wrapperRef = useOnclickOutside(() => {
      // When user clicks outside of the component, we can dismiss
      // the searched suggestions by calling this method
      clearSuggestions();
    });

    useEffect(() => {
      if (defaultValue) setValue(defaultValue, false);
    }, [defaultValue, setValue]);

    const handleInput = (e): void => {
      // Update the keyword of the input element
      setValue(e.target.value);
      onChange && onChange(e);
    };

    const handleSelect =
      ({ description }) =>
      () => {
        // Get latitude and longitude via utility functions
        getGeocode({ address: description })
          .then((results) => getLatLng(results[0]))
          .then((latLng) => {
            onSelect({
              address: description,
              latLng: {
                ...latLng,
              },
            });
          })
          .catch((error) => {
            console.log("😱 Error: ", error);
          });

        // When user selects a place, we can replace the keyword without request data from API
        // by setting the second parameter to "false"
        setValue(description, false);
        clearSuggestions();
      };

    const renderSuggestions = (): React.ReactElement[] =>
      data.map((suggestion) => {
        const {
          place_id,
          structured_formatting: { main_text, secondary_text },
        } = suggestion;

        return (
          <div
            key={place_id}
            onClick={handleSelect(suggestion)}
            onKeyDown={handleSelect(suggestion)}
            className={ItemStyle}
            role="button"
            tabIndex={0}
          >
            <strong>{main_text}</strong> <small>{secondary_text}</small>
          </div>
        );
      });

    return (
      <div className={WrapperStyle} ref={wrapperRef}>
        <input
          ref={ref}
          name={name}
          value={value}
          onChange={handleInput}
          onBlur={onBlur}
          disabled={!ready}
          placeholder="Ingresar dirección"
          autoComplete="off"
          className={`${InputStyle} ${value ? "pr-10" : ""} ${className}`}
        />
        {status === "OK" && (
          <div className={ListWrapperStyle}>
            <div className={ListStyle}>{renderSuggestions()}</div>
          </div>
        )}
        {value && value?.length && (
          <div
            className={InputCloseIconStyle}
            onClick={() =>
              handleInput({
                target: { value: "", name: name },
                currentTarget: { value: "", name: name },
              })
            }
            onKeyDown={() => setValue("")}
            role="button"
            tabIndex={0}
          >
            <CloseIcon height={16} width={16} />
          </div>
        )}
      </div>
    );
  }
);

export default PlacesAutocomplete;
