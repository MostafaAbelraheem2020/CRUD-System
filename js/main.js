let titelInp = document.querySelector(".titel");
let priceInp = document.querySelector(".price");
let taxesInp = document.querySelector(".taxes");
let adsInp = document.querySelector(".ads");
let discountInp = document.querySelector(".discount");
let countinp = document.querySelector(".count");
let totalR = document.querySelector(".total");
let categoryInp = document.querySelector(".category");
let createBbtn = document.querySelector(".create");
let search = document.querySelector(".search");
let searchTitel = document.querySelector(".search by titel");
let searchCategory = document.querySelector(".search by category");
let searchBtn = document.querySelector(".searchBtn");

let deleteAlldiv = document.querySelector(".delete-all");
let tabel = document.querySelector(".t-body");
/// صناعة مود للتغير بين الانشاء والتعديل
let mood = "create";
// عمل متغير يكافىء البارميتر اي في دالة الابديت بالاسفل
let temb;
// الحصول على جميع حقول الإدخال
let inputs = document.querySelectorAll("input");
// إضافة مستمع الأحداث لكل حقل إدخال
inputs.forEach((input, index) => {
  input.addEventListener("keydown", function (event) {
    // تحقق مما إذا كان الزر المضغوط هو "Enter"
    if (event.key === "Enter") {
      event.preventDefault(); // منع أي سلوك افتراضي مثل إرسال النموذج
      // الانتقال إلى حقل الإدخال التالي إذا كان موجودًا
      const nextInput = inputs[index + 1];
      if (nextInput) {
        nextInput.focus();
      }
    }
  });
});

/// في البداية يمكننا عمل دالة فحص خانة السعر حتى تبدأ العملية الحسابية
// وربط الدالة مع خاصية onkeyup
// في Html
inputchek = function () {
  if (priceInp.value != "") {
    let reslt =
      +priceInp.value + +taxesInp.value + +adsInp.value - +discountInp.value;

    totalR.innerHTML = `${reslt.toFixed(2)} $`;
  } else {
  }
};
// عمل دالة للحصول على البيانات عند الضغط على زر الانشاء
// 1 نبدأ بإنشاء مصفوفة لوضع البيانات بها لتسهيل التعامل مع البيانات
let MainDataArray;
if (localStorage.getItem("product") != null) {
  MainDataArray = JSON.parse(localStorage.getItem("product"));
} else {
  MainDataArray = [];
}
createBbtn.onclick = function () {
  if (titelInp.value.trim() === "" || priceInp.value <= 0) {
    alert("Please fill out all required fields correctly.");
    return;
  }
  let productObject = {
    titel: titelInp.value,
    price: priceInp.value,
    taxes: taxesInp.value,
    ads: adsInp.value,
    discount: discountInp.value,
    total: totalR.innerHTML,
    category: categoryInp.value,
    count: countinp.value,
  };
  if (mood === "create") {
    for (let i = 0; i < countinp.value; i++) {
      MainDataArray.push(productObject);
    }
  } else {
    MainDataArray[temb] = productObject;
    mood = "update";
    countinp.style.display = "inline-block";
    createBbtn.innerHTML = "Create";
    createBbtn.style.backgroundColor = "#009688";
  }
  localStorage.setItem("product", JSON.stringify(MainDataArray));
  clearInputs();
  showData();
};
// عمل دالة لتفريغ حقول الادخال
let clearInputs = function () {
  titelInp.value = "";
  priceInp.value = "";
  taxesInp.value = "";
  adsInp.value = "";
  discountInp.value = "";
  totalR.innerHTML = "";
  categoryInp.value = "";
  countinp.value = "";
};
// عمل دالة سحب البيانات من الذاكرة وعرضها
let showData = function () {
  // let backData = JSON.parse(localStorage.getItem("product"));
  tabel.innerHTML = "";
  for (let i = 0; i < MainDataArray.length; i++) {
    let productData = `<tr>
          <th>${i + 1}</th>
          <th>${MainDataArray[i].titel} </th>
          <th>${MainDataArray[i].price} $</th>
          <th>${MainDataArray[i].taxes} $</th>
          <th>${MainDataArray[i].ads} $</th>
          <th>${MainDataArray[i].discount} $</th>
          <th>${MainDataArray[i].total} </th>
          <th>${MainDataArray[i].category}</th>
          <th onclick="updatebtnf(${i})" class="updatbtn">Update</th>
          <th onclick="deletbtnf(${i})" class="deletbtn ">Delete</th>
      </tr>`;
    tabel.innerHTML += productData;
  }
  delletAll();
};
// عمل زرار حزف الكل
delletAll = function () {
  if (MainDataArray.length > 0) {
    deleteAlldiv.innerHTML = `<button class="deletbtn ">Delete All ( ${MainDataArray.length} )</button>`;
    deleteAlldiv.addEventListener("click", () => {
      localStorage.clear();
      MainDataArray.splice(0);

      showData();
    });
  } else {
    deleteAlldiv.innerHTML = "";
  }
};
// delete btn
deletbtnf = function (i) {
  MainDataArray.splice(i, 1);
  localStorage.setItem("product", JSON.stringify(MainDataArray));
  showData();
};

// دالة التعديل
updatebtnf = function (i) {
  titelInp.value = MainDataArray[i].titel;
  priceInp.value = MainDataArray[i].price;
  taxesInp.value = MainDataArray[i].taxes;
  adsInp.value = MainDataArray[i].ads;
  discountInp.value = MainDataArray[i].discount;
  categoryInp.value = MainDataArray[i].category;
  countinp.style.display = "none";
  createBbtn.innerHTML = "Update";
  createBbtn.style.backgroundColor = "#4CAF50";
  mood = "update";
  temb = i;
  scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
};
// Search
let searchMood = "titel";
function getsearchmood(className) {
  if (className === "by titel") {
    searchMood = "titel";
  } else {
    searchMood = "category";
  }
  search.placeholder = `Search By : ${searchMood}`;
}
function searchFn(value) {
  let searchValue = "";

  searchBtn.addEventListener("click", () => {
    tabel.innerHTML = "";
    if (searchMood === "titel") {
      for (let i = 0; i < MainDataArray.length; i++) {
        searchValue = value.toLowerCase();
        if (MainDataArray[i].titel.toLowerCase().includes(searchValue)) {
          let productData = `<tr>
              <th>${i + 1}</th>
              <th>${MainDataArray[i].titel} </th>
              <th>${MainDataArray[i].price} $</th>
              <th>${MainDataArray[i].taxes} $</th>
              <th>${MainDataArray[i].ads} $</th>
              <th>${MainDataArray[i].discount} $</th>
              <th>${MainDataArray[i].total} </th>
              <th>${MainDataArray[i].category}</th>
              <th onclick="updatebtnf(${i})" class="updatbtn">Update</th>
              <th onclick="deletbtnf(${i})" class="deletbtn ">Delete</th>
          </tr>`;
          tabel.innerHTML += productData;
        }
      }
    } else if (searchMood === "category") {
      for (let i = 0; i < MainDataArray.length; i++) {
        searchValue = value.toLowerCase();
        if (MainDataArray[i].category.toLowerCase().includes(searchValue)) {
          let productData = `<tr>
              <th>${i + 1}</th>
              <th>${MainDataArray[i].titel} </th>
              <th>${MainDataArray[i].price} $</th>
              <th>${MainDataArray[i].taxes} $</th>
              <th>${MainDataArray[i].ads} $</th>
              <th>${MainDataArray[i].discount} $</th>
              <th>${MainDataArray[i].total} </th>
              <th>${MainDataArray[i].category}</th>
              <th onclick="updatebtnf(${i})" class="updatbtn">Update</th>
              <th onclick="deletbtnf(${i})" class="deletbtn ">Delete</th>
          </tr>`;
          tabel.innerHTML += productData;
        }
      }
    }
    if (tabel.innerHTML === "") {
      tabel.innerHTML = `<tr><td  colspan="10">No products found As "${searchValue}"</td></tr>`;
    }
  });
  showData();
}

showData();
