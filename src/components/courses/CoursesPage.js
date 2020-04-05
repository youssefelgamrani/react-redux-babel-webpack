import React, { Component } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";

class CoursesPage extends Component {
  state = {
    course: {
      title: "",
    },
  };

  handleChange = (event) => {
    const course = { ...this.state.course, title: event.target.value };
    this.setState({ course: course });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    debugger;
    this.props.courseActions.createCourse(this.state.course);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Courses</h2>
        <h3>Add course</h3>
        <input
          type="text"
          onChange={this.handleChange}
          value={this.state.course.title}
        />
        <input type="submit" value="save" />
        {this.props.courses.map((course) => (
          <div key={course.title}>{course.title}</div>
        ))}
      </form>
    );
  }
}

CoursesPage.propTypes = {
  courseActions: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    courses: state.courses,
  };
}
/** Type 1 : native one */
/** 
function mapDispatchToProps(dispatch) {
  return {
    createCourse: (course) => dispatch(courseActions.createCourse(course)),
  };
}*/

/** Type 2 : use bindActionCreators */

function mapDispatchToProps(dispatch) {
  return {
    courseActions: bindActionCreators(courseActions, dispatch),
  };
}

/** Type 3 */
/**
const mapDispatchToProps = {
  createCourse: courseActions.createCourse,
};*/

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
