import * as React from "react"
import Tab from "@mui/material/Tab"
import TabContext from "@mui/lab/TabContext"
import TabList from "@mui/lab/TabList"
import styled from "@emotion/styled"
import { Paper } from "@mui/material"
import OrderTabItem from "./OrderTabItem"

const StyledTab = styled(Tab)({
  fontWeight: 1000,
  color: "black",
  width: "20%"
})

export default function OrderTab({ orderStatusList, data }) {
  const [value, setValue] = React.useState("1")
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <>
      <TabContext value={value}>
        <Paper>
          <TabList onChange={handleChange}>
            {orderStatusList.map((item, key) => (
              <StyledTab
                label={item.status}
                value={item.statusId.toString()}
                key={key}
              />
            ))}
          </TabList>
        </Paper>
        {orderStatusList.map((item, index) => (
          <OrderTabItem
            value={item.statusId.toString()}
            key={index}
            order={data}
          />
        ))}
      </TabContext>
    </>
  )
}
