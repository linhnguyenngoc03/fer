import { Grid, Select, MenuItem } from "@mui/material"
import React, { useEffect, useState } from "react"

export default function Address({ setAddress }) {
  const [city, setCity] = useState(null)
  const [cityOption, setCityOption] = useState(null)
  const [district, setDistrict] = useState(null)
  const [districtOption, setDistrictOption] = useState(null)
  const [ward, setWard] = useState(null)
  const [wardOption, setWardOption] = useState(null)

  useEffect(() => {
    const getCityOption = async () => {
      const response = await fetch(
        "https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1"
      )
      const cities = await response.json()
      setCityOption(cities.data.data)
    }
    const getDistrictOption = async code => {
      const response = await fetch(
        `https://vn-public-apis.fpo.vn/districts/getByProvince?provinceCode=${code}&limit=-1`
      )
      const districts = await response.json()
      setDistrictOption(districts.data.data)
    }
    cityOption === null ? getCityOption() : null
    city !== null ? getDistrictOption(city.code) : null
  }, [city])
  useEffect(() => {
    const getWardOption = async code => {
      const response = await fetch(
        `https://vn-public-apis.fpo.vn/wards/getByDistrict?districtCode=${code}&limit=-1`
      )
      const wards = await response.json()
      setWardOption(wards.data.data)
    }
    district !== null ? getWardOption(district.code) : null
  }, [district])
  useEffect(() => {
    ward !== null
      ? setAddress(
          `Phường xã: ${ward.name}, Quận huyện: ${district.name}, Thành phố: ${city.name}`
        )
      : null
  }, [ward])
  return (
    <Grid
      container
      spacing={1}
      sx={{
        marginBottom: "0.5rem"
      }}
    >
      <Grid
        item
        xs={6}
        style={{
          color: "gray",
          fontSize: "0.9rem",
          fontWeight: "600"
        }}
      >
        * Tỉnh / Thành phố
        {cityOption !== null && cityOption !== undefined ? (
          <Select
            fullWidth
            value={city}
            size="small"
            onChange={event => {
              setCity(event.target.value)
            }}
          >
            <MenuItem key={-1} value={undefined}></MenuItem>
            {cityOption.map((city, key) => (
              <MenuItem key={key} value={city}>
                {city.name}
              </MenuItem>
            ))}
          </Select>
        ) : (
          <Select fullWidth disabled={true} size="small" />
        )}
      </Grid>
      <Grid
        item
        xs={6}
        style={{
          color: "gray",
          fontSize: "0.9rem",
          fontWeight: "600"
        }}
      >
        * Quận / Huyện
        {districtOption !== null && districtOption !== undefined ? (
          <Select
            fullWidth
            value={district}
            size="small"
            onChange={event => {
              setDistrict(event.target.value)
            }}
          >
            <MenuItem key={-1} value={undefined}></MenuItem>
            {districtOption.map((district, key) => (
              <MenuItem key={key} value={district}>
                {district.name}
              </MenuItem>
            ))}
          </Select>
        ) : (
          <Select fullWidth disabled={true} size="small" />
        )}
      </Grid>
      <Grid
        item
        xs={6}
        style={{
          color: "gray",
          fontSize: "0.9rem",
          fontWeight: "600"
        }}
      >
        * Phường / Xã
        {wardOption !== null ? (
          <Select
            fullWidth
            value={ward}
            size="small"
            onChange={event => {
              setWard(event.target.value)
            }}
          >
            <MenuItem key={-1} value={undefined}></MenuItem>
            {wardOption.map((ward, key) => (
              <MenuItem key={key} value={ward}>
                {ward.name}
              </MenuItem>
            ))}
          </Select>
        ) : (
          <Select fullWidth disabled={true} size="small" />
        )}
      </Grid>
    </Grid>
  )
}
