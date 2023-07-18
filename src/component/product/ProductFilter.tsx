import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { categoryList, productStatus } from "@/config/setup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
export default function ProductFilter() {
  const [categoryNumber, setCategoryNumber] = useState(-1);
  const [priceNumber, setPriceNumber] = useState(-1);
  const [statusNumber, setStatusNumber] = useState(-1)
  return (
    <Paper>
      <div
        style={{
          padding: "1rem",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "500",
          }}
        >
          Phân loại
        </Typography>
        {categoryList.map((item: any, key: any) => (
          <FormControlLabel
            control={<Checkbox checked={categoryNumber === key ? true : false} />}
            label={item.categoryName}
            key={key}
            sx={{
              width: "100%",
              paddingLeft: "1rem"
            }}
            value={categoryNumber === key ? true : false}
            onChange={(_, value) => {
              value === true ? setCategoryNumber(key) : setCategoryNumber(-1)
            }}
          />
        ))}
      </div>
      <div
        style={{
          padding: "1rem",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "500",
          }}
        >
          Giá
        </Typography>
        {categoryList.map((item: any, key: any) => (
          <FormControlLabel
            control={<Checkbox checked={priceNumber === key ? true : false} />}
            label={item.categoryName}
            key={key}
            sx={{
              width: "100%",
              paddingLeft: "1rem"
            }}
            value={priceNumber === key ? true : false}
            onChange={(_, value) => {
              value === true ? setPriceNumber(key) : setPriceNumber(-1)
            }}
          />
        ))}
      </div>
      <div
        style={{
          padding: "1rem",
        }}
      >
        {productStatus.map((item, key) => (
          <FormControlLabel
          control={<Checkbox checked={statusNumber === key ? true : false} />}
          label={item.name}
          key={key}
          sx={{
            width: "100%",
            paddingLeft: "1rem"
          }}
          value={statusNumber === key ? true : false}
            onChange={(_, value) => {
              value === true ? setStatusNumber(key) : setStatusNumber(-1)
            }}
        />
        ))}
      </div>
    </Paper>
  );
}
