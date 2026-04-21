const citiesData = {
  "provinces": [
    { "code": "110000", "name": "北京市" },
    { "code": "120000", "name": "天津市" },
    { "code": "130000", "name": "河北省" },
    { "code": "140000", "name": "山西省" },
    { "code": "150000", "name": "内蒙古自治区" },
    { "code": "210000", "name": "辽宁省" },
    { "code": "220000", "name": "吉林省" },
    { "code": "230000", "name": "黑龙江省" },
    { "code": "310000", "name": "上海市" },
    { "code": "320000", "name": "江苏省" },
    { "code": "330000", "name": "浙江省" },
    { "code": "340000", "name": "安徽省" },
    { "code": "350000", "name": "福建省" },
    { "code": "360000", "name": "江西省" },
    { "code": "370000", "name": "山东省" },
    { "code": "410000", "name": "河南省" },
    { "code": "420000", "name": "湖北省" },
    { "code": "430000", "name": "湖南省" },
    { "code": "440000", "name": "广东省" },
    { "code": "450000", "name": "广西壮族自治区" },
    { "code": "460000", "name": "海南省" },
    { "code": "500000", "name": "重庆市" },
    { "code": "510000", "name": "四川省" },
    { "code": "520000", "name": "贵州省" },
    { "code": "530000", "name": "云南省" },
    { "code": "540000", "name": "西藏自治区" },
    { "code": "610000", "name": "陕西省" },
    { "code": "620000", "name": "甘肃省" },
    { "code": "630000", "name": "青海省" },
    { "code": "640000", "name": "宁夏回族自治区" },
    { "code": "650000", "name": "新疆维吾尔自治区" },
    { "code": "710000", "name": "台湾省" },
    { "code": "810000", "name": "香港特别行政区" },
    { "code": "820000", "name": "澳门特别行政区" }
  ],
  "cities": {
    "110000": [{ "code": "110100", "name": "北京市" }],
    "120000": [{ "code": "120100", "name": "天津市" }],
    "310000": [{ "code": "310100", "name": "上海市" }],
    "500000": [{ "code": "500100", "name": "重庆市" }],
    "320000": [
      { "code": "320100", "name": "南京市" },
      { "code": "320200", "name": "无锡市" },
      { "code": "320300", "name": "徐州市" },
      { "code": "320400", "name": "常州市" },
      { "code": "320500", "name": "苏州市" },
      { "code": "320600", "name": "南通市" }
    ],
    "330000": [
      { "code": "330100", "name": "杭州市" },
      { "code": "330200", "name": "宁波市" },
      { "code": "330300", "name": "温州市" },
      { "code": "330400", "name": "嘉兴市" },
      { "code": "330500", "name": "湖州市" },
      { "code": "330600", "name": "绍兴市" }
    ],
    "440000": [
      { "code": "440100", "name": "广州市" },
      { "code": "440300", "name": "深圳市" },
      { "code": "440400", "name": "珠海市" },
      { "code": "440500", "name": "汕头市" },
      { "code": "440600", "name": "佛山市" },
      { "code": "440700", "name": "江门市" }
    ]
  },
  "districts": {
    "110100": [
      { "code": "110101", "name": "东城区" },
      { "code": "110102", "name": "西城区" },
      { "code": "110105", "name": "朝阳区" },
      { "code": "110106", "name": "丰台区" },
      { "code": "110107", "name": "石景山区" },
      { "code": "110108", "name": "海淀区" }
    ],
    "310100": [
      { "code": "310101", "name": "黄浦区" },
      { "code": "310104", "name": "徐汇区" },
      { "code": "310105", "name": "长宁区" },
      { "code": "310106", "name": "静安区" },
      { "code": "310107", "name": "普陀区" },
      { "code": "310109", "name": "虹口区" }
    ],
    "440100": [
      { "code": "440103", "name": "荔湾区" },
      { "code": "440104", "name": "越秀区" },
      { "code": "440105", "name": "海珠区" },
      { "code": "440106", "name": "天河区" },
      { "code": "440111", "name": "白云区" },
      { "code": "440112", "name": "黄埔区" }
    ],
    "440300": [
      { "code": "440303", "name": "罗湖区" },
      { "code": "440304", "name": "福田区" },
      { "code": "440305", "name": "南山区" },
      { "code": "440306", "name": "宝安区" },
      { "code": "440307", "name": "龙岗区" },
      { "code": "440308", "name": "盐田区" }
    ]
  }
};

function initProvinces() {
  const birthProvince = document.getElementById('birthProvince');
  const currentProvince = document.getElementById('currentProvince');
  
  citiesData.provinces.forEach(province => {
    const option = document.createElement('option');
    option.value = province.code;
    option.textContent = province.name;
    birthProvince.appendChild(option.cloneNode(true));
    currentProvince.appendChild(option);
  });
  
  birthProvince.addEventListener('change', function() {
    updateCities('birth', this.value);
  });
  
  currentProvince.addEventListener('change', function() {
    updateCities('current', this.value);
  });
}

function updateCities(type, provinceCode) {
  const citySelect = document.getElementById(type + 'City');
  const districtSelect = document.getElementById(type + 'District');
  
  citySelect.innerHTML = '<option value="">请选择</option>';
  districtSelect.innerHTML = '<option value="">请选择</option>';
  
  if (citiesData.cities[provinceCode]) {
    citiesData.cities[provinceCode].forEach(city => {
      const option = document.createElement('option');
      option.value = city.code;
      option.textContent = city.name;
      citySelect.appendChild(option);
    });
    
    citySelect.addEventListener('change', function() {
      updateDistricts(type, this.value);
    });
  }
}

function updateDistricts(type, cityCode) {
  const districtSelect = document.getElementById(type + 'District');
  
  districtSelect.innerHTML = '<option value="">请选择</option>';
  
  if (citiesData.districts[cityCode]) {
    citiesData.districts[cityCode].forEach(district => {
      const option = document.createElement('option');
      option.value = district.code;
      option.textContent = district.name;
      districtSelect.appendChild(option);
    });
  }
}

window.onload = function() {
  initProvinces();
};