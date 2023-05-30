import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import numeral from "numeral";

export default function MediaCard({
  id,
  image,
  title,
  description,
  oldPrice,
  newPrice,
}) {
  console.log(oldPrice);
  return (
    <Card sx={{ maxWidth: 345 }} style={{ marginBottom: "1rem" }}>
      <CardMedia sx={{ height: 140 }} image={image} title="green iguana" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          style={{ textAlign: "justify" }}
        >
          {description.slice(0, 200) + "..."}
        </Typography>
        <del>{`${numeral(oldPrice).format("0,0")}đ`}</del>
        <p>{`${numeral(newPrice).format("0,0")}đ`}</p>
      </CardContent>
      <CardActions>
        <Link to={`/product-detail/${id}`}>
          <Button size="small">Xem thêm</Button>
        </Link>
      </CardActions>
    </Card>
  );
}
