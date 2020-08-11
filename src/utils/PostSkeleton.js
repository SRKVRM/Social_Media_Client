import React, { Fragment } from "react";
import NoImg from "../images/no-img.png";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
// MUI
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";

const styles = {
  card: {
    display: "flex",
    marginBottom: 20,
  },
  cardContent: {
    width: "100%",
    flexDirection: "column",
    padding: 25,
  },
  cover: {
    minWidth: 180,
    objectFit: "cover",
  },
  handle: {
    width: 90,
    height: 18,
    backgroundColor: "#212121",
    marginBottom: 7,
  },
  date: {
    width: 150,
    height: 14,
    backgroundColor: "rgba(0,0,0, 0.2)",
    marginBottom: 10,
  },
  fullLine: {
    width: "90%",
    height: 15,
    backgroundColor: "rgba(0,0,0, 0.5)",
    marginBottom: 10,
  },
  halfLine: {
    width: "50%",
    height: 15,
    backgroundColor: "rgba(0,0,0, 0.5)",
    marginBottom: 10,
  },
};

const PostSkeleton = (props) => {
  const { classes } = props;

  const content = Array.from({ length: 5 }).map((item, index) => (
    <Card className={classes.card} key={index}>
      <CardMedia className={classes.cover} image={NoImg} />
      <CardContent className={classes.cardContent}>
        <div className={classes.handle} />
        <div className={classes.date} />
        <div className={classes.fullLine} />
        <div className={classes.fullLine} />
        <div className={classes.halfLine} />
      </CardContent>
    </Card>
  ));
  return <Fragment>{content}</Fragment>;
};

PostSkeleton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostSkeleton);
