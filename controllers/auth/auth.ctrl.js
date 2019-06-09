const express = require("express");
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const KakaoStrategy = require("passport-kakao").Strategy;
const dotenv = require("dotenv");
const models = require("../../models");

dotenv.config(); // LOAD CONFIG

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// 페이스북 로그인
passport.use(
  new FacebookStrategy(
    {
      // https://developers.facebook.com에서 appId 및 scretID 발급
      clientID: process.env.FACEBOOK_APPID, // 입력하세요
      clientSecret: process.env.FACEBOOK_SECRETCODE, // 입력하세요.
      callbackURL: `${process.env.SITE_DOMAIN}/auth/facebook/callback`,
      profileFields: ["id", "displayName", "photos", "email"] // 받고 싶은 필드 나열
    },
    async (accessToken, refreshToken, profile, done) => {
      // 아래 하나씩 찍어보면서 데이터를 참고해주세요.
      // console.log(accessToken);
      // console.log(profile);
      // console.log(profile.displayName);
      // console.log(profile.emails[0].value);
      // console.log(profile._raw);
      // console.log(profile._json);

      try {
        const username = `fb_${profile.id}`;

        // 존재하는지 체크
        const exist = await models.User.count({
          where: {
            // 아이디로 조회를 해봅니다.
            username
          }
        });

        let user;
        if (!exist) {
          user = await models.User.create({
            username,
            displayname: profile.displayName,
            password: "facebook"
          });
        } else {
          user = await models.User.findOne({
            where: {
              username
            }
          });
        }

        return done(null, user);
      } catch (e) {
        console.log(e);
      }
    }
  )
);

exports.get_facebook_fail = (_, res) => {
  res.send("facebook login fail");
};

// 카카오톡 로그인
passport.use(
  new KakaoStrategy(
    {
      clientID: process.env.KAKAO_APIKEY,
      clientSecret: "", // clientSecret을 사용하지 않는다면 넘기지 말거나 빈 스트링을 넘길 것
      callbackURL: `${process.env.SITE_DOMAIN}/auth/kakao/callback`
    },
    async (accessToken, refreshToken, profile, done) => {
      // 사용자의 정보는 profile에 들어있다.
      try {
        const username = `kakao_${profile.id}`;

        // 존재하는지 체크
        const exist = await models.User.count({
          where: {
            // 아이디로 조회를 해봅니다.
            username
          }
        });

        let user;
        if (!exist) {
          user = await models.User.create({
            username,
            displayname: profile.displayName,
            password: "kakaotalk"
          });
        } else {
          user = await models.User.findOne({
            where: {
              username
            }
          });
        }

        return done(null, user);
      } catch (e) {
        console.log(e);
      }
    }
  )
);

exports.get_kakao_fail = (_, res) => {
  res.send("kakao login fail");
};
