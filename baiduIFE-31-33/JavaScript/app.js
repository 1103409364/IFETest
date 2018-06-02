var tableHead = ["商品", "地区", "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
var tableWrapper = document.getElementById("table-wrapper");

var checkboxWrapper = document.getElementById("checkbox-wrapper");
var eCN = document.getElementById(regionCheckboxObj[0].value);
var sCN = document.getElementById(regionCheckboxObj[1].value);
var nCN = document.getElementById(regionCheckboxObj[2].value);

var phone = document.getElementById(productCheckboxObj[0].value);
var notebook = document.getElementById(productCheckboxObj[1].value);
var googleHome = document.getElementById(productCheckboxObj[2].value);

var regionArr = [eCN, sCN, nCN];
var productArr = [phone, notebook, googleHome];

//默认状态初始化
renderTable(getData(sourceData));
