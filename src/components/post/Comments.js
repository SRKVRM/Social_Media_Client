import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import theme from "../../utils/theme";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import MyButton from "../../utils/MyButton";

// MUI stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import DeleteOutline from "@material-ui/icons/DeleteOutline";

import { connect } from "react-redux";
import { deleteComment } from "../../redux/actions/dataActions";

const styles = theme;

class Comments extends Component {
  deleteComment = (postId, commentId) => {
    this.props.deleteComment(postId, commentId);
  };
  render() {
    const {
      classes,
      comments,
      user: {
        authenticated,
        credentials: { handle },
      },
    } = this.props;

    return (
      <Grid container>
        {comments.map((comment, index) => {
          const {
            body,
            createdAt,
            userHandle,
            userImage,
            postId,
            commentId,
          } = comment;
          return (
            <Fragment key={createdAt}>
              <Grid item sm={12}>
                <Grid container>
                  <Grid item sm={2}>
                    <img
                      src={userImage}
                      alt="comment"
                      className={classes.commentImage}
                    />
                  </Grid>
                  <Grid item sm={9}>
                    <div className={classes.commentData}>
                      <Typography
                        variant="h5"
                        component={Link}
                        to={`/users/${userHandle}`}
                        color="primary"
                      >
                        {userHandle}
                      </Typography>

                      <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
                      </Typography>

                      <hr className={classes.invisibleSeparator} />
                      <Typography variant="body1">{body}</Typography>
                    </div>
                  </Grid>
                  <Grid item sm={1} className={classes.deleteButton}>
                    {authenticated && userHandle === handle ? (
                      <Fragment>
                        <MyButton
                          tip="Delete Comment"
                          onClick={() => this.deleteComment(postId, commentId)}
                        >
                          <DeleteOutline color="secondary" />
                        </MyButton>
                      </Fragment>
                    ) : null}
                  </Grid>
                </Grid>
              </Grid>
              {index !== comments.length - 1 && (
                <hr className={classes.visibleSeparator} />
              )}
            </Fragment>
          );
        })}
      </Grid>
    );
  }
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
});

export default connect(mapStateToProps, { deleteComment })(
  withStyles(styles)(Comments)
);
