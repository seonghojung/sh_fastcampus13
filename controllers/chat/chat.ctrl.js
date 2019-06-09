exports.get_chat = (req, res) => {
  if (!req.isAuthenticated()) {
    res.send(
      '<script>alert("로그인이 필요한 서비스입니다.");\
        location.href="/accounts/login";</script>'
    );
  } else {
    res.render("chat/index.html");
  }
};
