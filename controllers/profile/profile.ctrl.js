const models = require("../../models");

// 프로필 페이지
exports.get_profile = (_, res) => {
  res.render("profile/index.html");
};

// 프로필 수정 페이지
exports.get_profile_update = async (req, res) => {
  try {
    const user = await models.User.findOne({
      where: {
        id: req.user.id
      }
    });
    res.render("profile/editForm.html", { user, csrfToken: req.csrfToken() });
  } catch (e) {
    console.log(e);
  }
};
exports.post_profile_update = async (req, res) => {
  try {
    await models.User.update(
      {
        displayname: req.body.displayname
      },
      {
        where: { username: req.body.username }
      }
    );
    req.login(req.user, err => {
      if (err) {
        return next(err);
      }
      return res.redirect("/profile");
    });
  } catch (e) {
    console.log(e);
  }
};
