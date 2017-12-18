//魚クラス
class Fish {
  constructor(name, telepoArea, area, weather, time, bait, howto, done = false)
  {
    this.name = name;
    this.telepoArea = telepoArea;
    this.area = area;
    this.weather = weather;
    this.time = time;
    this.bait = bait;
    this.howto = howto;
    this.done = done;
  }
  Done()
  {
    this.done = true;
  }
  Undone()
  {
    this.done = false;
  }
}

//ローカルストレージから魚リストを取得
let getFishListLocalStorage = () => {
  let fishList = [];
  if (localStorage.getItem("fishList") != null)
  {
    fishList = localStorage.getItem("fishList");
    fishList = JSON.parse(fishList);
  }

  return fishList;
}

//魚リストをローカルストレージに保存する
let setFishListLocalStorage = (fishList) => {
  let jsonData = JSON.stringify(fishList);
  localStorage.setItem("fishList", jsonData);
}

//魚データ初期値（理想）
let exampleFishList = [new Fish('ヘリコプリオン', 'クォーリーミル', 'ウルズの恵み', '雷、雷雨', 'なし', 'グローワーム→トップウォーターフロッグ', '雷、雷雨時にグローワームでオオタキタロを釣り上げ、「漁師の直感（１分）」にエサをトップウォーターフロッグに変更して狙う'),
                       new Fish('ナミタロ', '南ザナラーン', 'ザゴリー砂海', '曇／霧→灼熱波', '8:00〜19:59', 'サンドリーチ', 'サンドストームライダー（サンドリーチ）で泳がせ釣り'),
                       new Fish('クノ・ザ・キラー', 'モードゥナ', '唄う裂谷北部', '妖霧', '8:00〜17:59', 'ハニーワーム', '銀魚（ハニーワーム）→金魚→ジャノを釣り上げ「漁師の直感（２４分）」発動後、銀魚（ハニーワーム）→銀魚→アサシンベタからの泳がせ釣り。漁師の直感後は天気が関係ないため、諦めない。'),];

let checkError = (fish) => {
  if (fish.name == '') 
    return true;
  if (fish.telepoArea == '')
    return true;
  if (fish.area == '')
    return true;
  if (fish.bait == '')
    return true;

  return false;
}

//Vueインスタンスの作成
let vm = new Vue({
  el: '#fish-list',
  data: {
    fishes: getFishListLocalStorage(),
    addFishData: {
      name: '', telepoArea: '', area: '',
      weather: '', time: '', bait: '', howto: ''
    },
    inputBtnMessage: '',
    errorMassage: '',
  },
  computed: {
    addBtnClass: function() {
      let isError = checkError(this.addFishData);
      this.errorMassage = isError? '未入力項目があります': '追加する';
      return isError? 'btn-danger': 'btn-primary';
    }
  },
  methods: {
    addFish: function() {
      if (checkError(this.addFishData))
        return;

      let newFishData = new Fish(this.addFishData.name, 
                                  this.addFishData.telepoArea,
                                  this.addFishData.area,
                                  this.addFishData.weather == '' ? 'なし' : this.addFishData.weather,
                                  this.addFishData.time == ''? 'なし' : this.addFishData.time,
                                  this.addFishData.bait,
                                  this.addFishData.howto == ''? '特になし' : this.addFishData.howto);
      this.fishes.push(newFishData);

      setFishListLocalStorage(this.fishes);
      console.log("---addFish---");
      console.log(this.addFishData.name + "を追加しました");
      // addFishDataの初期化
      for (let key in this.addFishData)
      {
        this.addFishData[key] = '';
      }
    },
    doneFish: function(fish) {
      let index = this.fishes.indexOf(fish);
      this.fishes[index].done = true;
      setFishListLocalStorage(this.fishes);
      console.log("---doneFish---");
      console.log(fish.name + "を釣り上げました");
    },
    backFish: function(fish) {
      let index = this.fishes.indexOf(fish);
      this.fishes[index].done = false;
      setFishListLocalStorage(this.fishes);
      console.log("---backFish---");
      console.log(fish.name + "を再度釣りたくなりました");
    },
    deleteFish: function(fish) {
      console.log("---deleteFish---");
      let index = this.fishes.indexOf(fish);
      this.fishes.splice(index, 1);
      setFishListLocalStorage(this.fishes);
      console.log(fish.name + "を釣りリストから削除しました");
    },
    importExampleFishList: function() {
      console.log("---importExampleFishList---");
      exampleFishList.forEach((value) => {
        this.fishes.push(value);
        console.log("import: " + value.name);
      });
      setFishListLocalStorage(this.fishes);
      console.log(exampleFishList.length + "ひきのオオヌシを釣りリストに追加しました");
    },
    deleteFishList: function() {
      this.fishes.splice(0, this.fishes.length);
      setFishListLocalStorage(this.fishes);
      console.log("---deleteFishList---");
      console.log("登録した魚リストを初期化しました");
    }
  },
})
    // fishes: [
    //   {name: 'ヘリコプリオン', telepoArea: 'クォーリーミル', area: 'ウルズの恵み',
    //   weather: '雷、雷雨', time: 'なし', bait: 'グローワーム→トップウォーターフロッグ', howto: '雷、雷雨時にグローワームでオオタキタロを釣り上げ、「漁師の直感（１分）」にエサをトップウォーターフロッグに変更して狙う',
    //   done: false, isDelete: false},
    //   {name: 'ナミタロ', telepoArea: '南ザナラーン', area: 'ザゴリー砂海',
    //   weather: '曇／霧→灼熱波', time: '8:00〜19:59', bait: 'サンドリーチ', howto: 'サンドストームライダー（サンドリーチ）で泳がせ釣り',
    //   done: false, isDelete: false},
    //   {name: 'クノ・ザ・キラー', telepoArea: 'モードゥナ', area: '唄う裂谷北部',
    //   weather: '妖霧', time: '8:00〜17:59', bait: 'ハニーワーム', howto: '銀魚（ハニーワーム）→金魚→ジャノを釣り上げ「漁師の直感（２４分）」発動後、銀魚（ハニーワーム）→銀魚→アサシンベタからの泳がせ釣り。漁師の直感後は天気が関係ないため、諦めない。',
    //   done: false, isDelete: false},
    // ],
