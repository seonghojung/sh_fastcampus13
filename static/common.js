function getCookie(cname) {
  const name = `${cname}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");

  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function setCookieHour(name, value, hours) {
  const now = new Date();
  let time = now.getTime();
  time += 3600 * 1000 * hours;
  now.setTime(time);
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; expires=${now.toUTCString()};`;
}

// 좋아요 구현
$(document).on("click", ".add_like", function (e) {
  // 주소에 # 붙는것 방지
  e.preventDefault();

  // 부모 요소의 아이디를 가져온다.
  const target_id = $(this)
    .parent()
    .attr("id");

  // 현재 제품의 id 받아옴
  const product_id = $(this).attr("product_id");

  $.ajax({
    url: `/products/like/${product_id}`,
    type: "post"
  })
    .done(() => {
      $(`#${target_id}`).html(
        `\
            <a product_id="${product_id}" class="pull-right remove_like" href="#"> \
                <img src="/static/img/likeon.png" width="20" alt=""> \
            </a> \
        `
      );
    })
    .fail(() => {
      console.log("오류발생");
    });
});

// 좋아요 해제 구현
$(document).on("click", ".remove_like", function (e) {
  // 주소에 # 붙는것 방지
  e.preventDefault();

  // 부모 요소의 아이디를 가져온다.
  const target_id = $(this)
    .parent()
    .attr("id");

  // 현재 제품의 id 받아옴
  const product_id = $(this).attr("product_id");

  $.ajax({
    url: `/products/like/${product_id}`,
    type: "delete"
  })
    .done(() => {
      $(`#${target_id}`).html(
        `\
            <a product_id="${
  product_id
}" class="pull-right add_like" href="#"> \
                <img src="/static/img/likeoff.png" width="20" alt=""> \
            </a> \
        `
      );
    })
    .fail(() => {
      console.log("오류발생");
    });
});
