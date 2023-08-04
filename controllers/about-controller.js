export const aboutController = {
  //renders the about page
  index(request, response) {
    const viewData = {
      title: "About Weathertop",
    };
    console.log("about rendering");
    response.render("about-view", viewData);
  },
};
