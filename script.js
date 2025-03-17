let currentPage = 0;
const itemsPerPage = 10;
let dataset = SEARCH_DATASET;

function renderResults() {
  $("#results").empty();
  let start = currentPage * itemsPerPage;
  let end = start + itemsPerPage;
  let resultsToShow = dataset.slice(0, end);

  resultsToShow.forEach((item) => {
    // 資料處理顯示
    $("#results").append(`
                    <div class="result-container">
                        <a href="${item.url}" target="_blank"><h3>${item.title}</h3></a>
                        <p>${item.text}</p>
                        <small>${item.created_at} | 人氣: ${item.popularity}</small>
                    </div>
                `);
  });
  $("#result-count").text(`共找到 ${dataset.length} 筆結果`);
  // 載入更多按鈕消失
  if (end >= dataset.length) {
    $("#load-more").prop("disabled", true);
  }
}

$("#load-more").click(function () {
  currentPage++;
  renderResults();
});

$(".search-icon").click(function () {
  search();
});

$("#search-box").keypress(function (event) {
  if (event.which === 13) {
    search();
  }
});

function search() {
  // 搜尋功能(點擊放大鏡、Enter)
  let query = $("#search-box").val().toLowerCase();
  dataset = SEARCH_DATASET.filter(
    (item) =>
      item.title.toLowerCase().includes(query) ||
      item.text.toLowerCase().includes(query)
  );
  currentPage = 0;
  renderResults();
}

$("#sort-options").change(function () {
  let sortBy = $(this).val();
  dataset.sort((a, b) => {
    if (sortBy === "title") return a.title.localeCompare(b.title);
    if (sortBy === "created_at")
      return new Date(b.created_at) - new Date(a.created_at);
    if (sortBy === "popularity") return b.popularity - a.popularity;
  });
  currentPage = 0;
  renderResults();
});

$(window).scroll(function () {
  if ($(this).scrollTop() > 200) {
    $("#scroll-to-top").fadeIn();
  } else {
    $("#scroll-to-top").fadeOut();
  }
});

$("#scroll-to-top").click(function () {
  $("html, body").animate({ scrollTop: 0 }, "slow");
});

$("#theme-toggle").click(function () {
  $("body").toggleClass("dark-mode");
  $(this).text($("body").hasClass("dark-mode") ? "🌙" : "🌞");
});

$(document).ready(function () {
  renderResults();
});
