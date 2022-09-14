import React from "react";
export const Form = (props) => {
  //   const [formData, setFormData] = React.useState({
  //     category: "",
  //     levelOfDifficulty: "",
  //   });

  //   function handleChange(event) {
  //     const { name, value } = event.target;
  //     setFormData((prevFormData) => {
  //       return {
  //         ...prevFormData,
  //         [name]: value,
  //       };
  //     });
  //   }

  //   function handleSubmit(event) {
  //     event.preventDefault();

  //     console.log(formData);
  //   }

  return (
    <div className="form-container">
      <form onSubmit={props.handleSubmit}>
        <h2>Please select a category :</h2>
        <select
          id="category"
          value={props.formData.category}
          onChange={props.handleChange}
          name="category"
        >
          <option value="">Any Category</option>
          <option value="9">General Knowledge</option>
          <option value="10">Entertainment: Books</option>
          <option value="11">Entertainment: Film</option>
          <option value="12">Entertainment: Music</option>
          <option value="17">Science & Nature</option>
          <option value="21">Sports</option>
          <option value="22">Geography</option>
          <option value="23">History</option>
          <option value="26">Celebrities</option>
          <option value="27">Animals</option>
          <option value="31">Entertainment: Japanese Anime & Manga</option>
        </select>
        <br />
        <br />
        <br />
        <br />
        <h2>Select Level of Difficulty :</h2>
        <select
          id="levelOfDifficulty"
          value={props.formData.levelOfDifficulty}
          onChange={props.handleChange}
          name="levelOfDifficulty"
        >
          <option value="">Any Level</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <br />
        <br />
        <br />
        <br />
        <button>Start Quiz</button>
      </form>
    </div>
  );
};
