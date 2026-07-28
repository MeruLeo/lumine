import { SearchIcon } from "@/shared/components/icons";
import { Button, Label, ListBox, SearchField, Select } from "@heroui/react";

export const HeaderProjects = () => {
  return (
    <header className="flex flex-wrap gap-4 w-fit rounded-2xl bg-text-on-accent-light dark:bg-text-on-accent-dark p-2">
      <SearchField name="search" className={`w-full sm:w-[256px]`}>
        <SearchField.Group>
          <SearchField.SearchIcon style={{ margin: 0, marginRight: "1rem" }} />
          <SearchField.Input placeholder="جستجو در نام ، کارفرما و ..." />
          <SearchField.ClearButton style={{ margin: 0, marginLeft: "1rem" }} />
        </SearchField.Group>
      </SearchField>
      <Select className="w-full sm:w-[256px]" placeholder="شهر">
        <Select.Trigger>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover>
          <ListBox>
            <ListBox.Item id="florida" textValue="Florida">
              تهران
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="delaware" textValue="Delaware">
              اصفهان
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="california" textValue="California">
              شیراز
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="texas" textValue="Texas">
              تبریز
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="new-york" textValue="New York">
              یزد
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="washington" textValue="Washington">
              کرمان
              <ListBox.ItemIndicator />
            </ListBox.Item>
          </ListBox>
        </Select.Popover>
      </Select>
      <Button className={`w-full sm:w-[100px]`}>
        جستجو
        <SearchIcon />
      </Button>
    </header>
  );
};
