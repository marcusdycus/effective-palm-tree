"use client";

import type {
  ClearIndicatorProps,
  DropdownIndicatorProps,
  GroupBase,
  GroupHeadingProps,
  IndicatorSeparatorProps,
  MultiValueGenericProps,
  MultiValueRemoveProps,
  OptionProps,
  Props,
  StylesConfig,
} from "react-select";

import ReactSelectMulti, { components } from "react-select";

import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown, ChevronUp } from "../icons";
import { CancelIcon } from "../icons/CancelIcon";
import { UserIcon } from "../icons/UserIcon";

// from here: https://stackoverflow.com/questions/54083935/is-there-a-way-to-make-react-select-have-collapsible-groups
const handleHeaderClick = (id: string) => {
  const node = document?.querySelector(`#${id}`)?.parentElement
    ?.nextElementSibling?.classList;
  if (!node) return;
  node.contains("hidden") ? node.remove("hidden") : node.add("hidden");
};

function GroupHeading<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(props: GroupHeadingProps<Option, IsMulti, Group>) {
  return (
    <div
      className="group-heading-wrapper flex cursor-pointer flex-row items-center justify-between pr-2.5"
      onClick={() => handleHeaderClick(props.id)}
    >
      <components.GroupHeading {...props} />
      <ChevronDown className="flex" />
    </div>
  );
}

function Option<Option>(props: OptionProps<Option>) {
  const SubDiv = ({ children }: { children: React.ReactNode }) =>
    props.isFocused || props.isSelected ? (
      <div className="justify-left bg-outline flex cursor-pointer flex-row items-center gap-2 rounded-sm border-0 p-2">
        {children}
      </div>
    ) : (
      <div className="justify-left flex cursor-pointer flex-row items-center gap-2 p-2">
        {children}
      </div>
    );

  const Div = ({ children }: { children: React.ReactNode }) =>
    props.isFocused || props.isSelected ? (
      <div className="m-1 flex cursor-pointer flex-row rounded-sm border-0">
        <components.Option {...props}>
          <SubDiv>{children}</SubDiv>
        </components.Option>
      </div>
    ) : (
      <div className="m-1 flex cursor-pointer flex-row rounded-sm border-0">
        <components.Option {...props}>
          <SubDiv>{children}</SubDiv>
        </components.Option>
      </div>
    );

  return (
    <Div>
      <Checkbox
        className="pointer-events-none"
        checked={props.isSelected}
        onChange={() => null}
      />
      <div className="text-gray-blue flex">{props.label}</div>
    </Div>
  );
}

function MultiValueLabel<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(props: MultiValueGenericProps<Option, IsMulti, Group>) {
  return (
    <div className="flex flex-row items-center gap-1 bg-transparent pl-1.5">
      {props.children}
    </div>
  );
}

function createMultiValueLabelWithIcon<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(Icon: React.ComponentType) {
  return function MultiValueLabelWithIcon({
    children,
    ...props
  }: MultiValueGenericProps<Option, IsMulti, Group>) {
    return (
      <MultiValueLabel {...props}>
        <Icon />
        {children}
      </MultiValueLabel>
    );
  };
}

function MultiValueRemove<Option>(props: MultiValueRemoveProps<Option>) {
  return (
    <div className="flex items-center bg-transparent">
      <components.MultiValueRemove {...props}>
        {props.children}
      </components.MultiValueRemove>
    </div>
  );
}

function MultiValueContainer<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(props: MultiValueGenericProps<Option, IsMulti, Group>) {
  return (
    <div className="bg-outline mr-2.5 flex flex-row items-center gap-0.5 rounded-full border-0">
      <components.MultiValueContainer {...props}>
        {props.children}
      </components.MultiValueContainer>
    </div>
  );
}

function IndicatorSeparator<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(props: IndicatorSeparatorProps<Option, IsMulti, Group>) {
  return <div className="flex h-6 flex-row items-center" />;
}

function ClearIndicator<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(props: ClearIndicatorProps<Option, IsMulti, Group>) {
  return (
    <components.ClearIndicator {...props}>
      <CancelIcon className="h-3.5 w-3.5 " />
    </components.ClearIndicator>
  );
}

function DropdownIndicator<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(props: DropdownIndicatorProps<Option, IsMulti, Group>) {
  return props.selectProps.menuIsOpen ? (
    <components.DropdownIndicator {...props}>
      <ChevronUp className="h-5 w-5" />
    </components.DropdownIndicator>
  ) : (
    <components.DropdownIndicator {...props}>
      <ChevronDown className="h-5 w-5" />
    </components.DropdownIndicator>
  );
}

function MultiSelect<
  Option,
  IsMulti extends boolean = true,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({
  components,
  styles,
  labelIcon, // TODO: switch icons based on type
  onChange,
  ...props
}: Props<Option, IsMulti, Group> & {
  labelIcon?: React.ComponentType;
  onChange: (value: Option[]) => void;
}) {
  const customStyles: StylesConfig<Option, IsMulti, Group> = {
    menu: (provided) => ({
      ...provided,
      maxHeight: "300px",
      overflowY: "auto",
      zIndex: 1000,
    }),
    menuList: (provided) => ({
      ...provided,
      maxHeight: "300px",
      overflowY: "auto",
      zIndex: 9999,
    }),
    menuPortal: (provided) => {
      return {
        ...provided,
        marginBottom: "8px",
      };
    },
    option: (base) => ({
      ...base,
      border: `0px solid transparent`,
      borderRadius: "calc(var(--radius) - 4px)",
      padding: "0px",
      backgroundColor: "white",
      height: "100%",
      zIndex: 9999,
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: "var(--bg-outline)",
      borderRadius: "calc(var(--radius) - 0px)",
      padding: "0px",
    }),
    multiValueLabel: (base) => ({
      ...base,
      backgroundColor: "var(--bg-outline)",
      borderRadius: "calc(var(--radius) - 0px)",
      padding: "0px",
    }),
    groupHeading: (base) => ({
      ...base,
      margin: "0px",
      textTransform: "none",
      fontWeight: "bold",
      fontSize: "inherit",
      color: "var(--text-gray-blue)",
    }),
  };
  const MultiValueLabelWithIcon = createMultiValueLabelWithIcon<
    Option,
    IsMulti,
    Group
  >(labelIcon ?? UserIcon);

  return (
    <ReactSelectMulti
      components={{
        Option,
        MultiValueContainer,
        MultiValueLabel: MultiValueLabelWithIcon,
        MultiValueRemove,
        IndicatorSeparator,
        ClearIndicator,
        DropdownIndicator,
        GroupHeading,
        ...components,
      }}
      styles={{
        ...customStyles,
        ...styles,
      }}
      onChange={onChange}
      {...props}
    />
  );
}

export { MultiSelect };
