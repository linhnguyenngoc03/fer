import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import styled from "@emotion/styled";

const StyledTab = styled(Tab)({
  fontWeight: 1000,
  color: "black"
});
export default function ProductInformation() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      <Box marginTop={5}>
        <TabList onChange={handleChange}>
          <StyledTab label="Chi tiết" value="1" />
          <StyledTab label="Đánh giá" value="2" />
        </TabList>
      </Box>
      <TabPanel value="1">Item One</TabPanel>
      <TabPanel value="2">Item Two</TabPanel>
    </TabContext>
  );
}
