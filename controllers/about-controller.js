export const aboutController = {
  index(request, response) {
    const viewData = {
      title: "About Weathertop",
    };
    console.log("about rendering");
    response.render("about-view", viewData);
  },
};
