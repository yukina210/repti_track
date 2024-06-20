import Rails from "@rails/ujs"
Rails.start()

import Turbolinks from "turbolinks"
Turbolinks.start()

import "@hotwired/turbo-rails"
import "chartkick/chart.js"
import Chart from "chart.js/auto"
import "chartjs-adapter-date-fns"
import $ from "jquery"
import "bootstrap"
import "select2"
import "core-js/stable";
import "jquery-ui/ui/widgets/datepicker";

// Select2
document.addEventListener("turbo:load", function() {
  var petBreedSelect = document.getElementById('pet_breed');
  if (petBreedSelect) {
    $('#pet_breed').select2();
  }
});

// Pet registration
document.addEventListener("turbo:load", function() {
  // Avatar upload for both pet registration and edit
  var avatarPreview = document.getElementById('avatar-preview');
  var fileInput = document.getElementById('pet_avatar') || document.getElementById('profile_avatar');

  if (avatarPreview && fileInput) {
    // When the avatar preview is clicked, trigger the file input
    if (!avatarPreview.dataset.clickListenerAdded) {
      avatarPreview.addEventListener('click', function() {
        console.log("Avatar preview clicked"); // デバッグ用ログ
        fileInput.click();
      });
      avatarPreview.dataset.clickListenerAdded = true;
    }

    // グローバルスコープに関数を定義する
    window.updateAvatarPreview = function(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
          console.log("Updating avatar preview"); // デバッグ用ログ
          avatarPreview.src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    }

    // Set the onchange event to update the preview
    if (!fileInput.dataset.changeListenerAdded) {
      fileInput.addEventListener('change', function() {
        console.log("File input changed"); // デバッグ用ログ
        updateAvatarPreview(this);
      });
      fileInput.dataset.changeListenerAdded = true;
    }
  }

  // Category change event
  var roleSelect = document.getElementById('pet_category');
  if (roleSelect) {
    roleSelect.addEventListener('change', function() {
      var selectedCategory = this.value;
      var snakes=['その他', 'オリーブアレチヘビ', 'サビイロクチバシヘビ', 'モイラヘビ', 'モンペリエヘビ', 'アフリカンハウススネーク', 'ブラックハウススネーク', 'タカチホヘビ', 'ドラゴンスネーク', 'ガボンアダー', 'ツノスナクサリヘビ', 'パフアダー', 'ヨーロッパクサリヘビ', 'ラッセルクサリヘビ', 'アメリカヒメガラガラ', 'カパーヘッド', 'ニホンマムシ', 'ヌママムシ', 'ハブ', 'ブッシュマスター', 'マツゲハブ', 'ヨロイハブ', 'インドコブラ', 'エジプトコブラ', 'キングコブラ', 'ケープコブラ', 'ブラックマンバ', 'モノクルコブラ', 'リンカルス', 'サンゴパイプヘビ', 'サンビームヘビ', 'オオアオムチヘビ', 'ゴールデントビヘビ', 'ニシキブロンズヘビ', 'ハナナガムチヘビ', 'アオダイショウ', 'アカマダラ', 'アフリカタマゴヘビ', 'アムールラットスネーク', 'アリゾナマウンテンキングスネーク', 'イースタンインディゴスネーク', 'イエローテールクリボー', 'ウェスタンラットスネーク', 'エモリーラットスネーク', 'オオカサントウ', 'オグロクリボー', 'カリフォルニアキングスネーク', 'カワリシノビヘビ', 'ガンスタマゴヘビ', 'グァテマラミルクスネーク', 'クチベニヘビ', 'グレーバンドキングスネーク', 'ケープゴファースネーク', 'コーンスネーク', 'ゴファースネーク', 'コモンキングヘビ', 'サラサナメラ', 'サンルイスポトシキングヘビ', 'シナククリィヘビ', 'シマヘビ', 'ジムグリ', 'ジャンセンラットスネーク', 'シュウダ', 'シロマダラ', 'スジメアオナメラ', 'スペックルドキングスネーク', 'タイガーラットスネーク', 'タイワンアオヘビ', 'タカサゴナメラ', 'トランスペコスラットスネーク', 'ナンダ', 'パインヘビ', 'ヒメナンダ', 'ヒョウモンナメラ', 'ブームスラング', 'プレーリーキングスネーク', 'ベアードラットスネーク', 'ベニナメラ', 'ホウシャナメラ', 'ホソツラナメラ', 'マングローブヘビ', 'ミナミオオガシラ', 'ミルクヘビ', 'メキシカンミルクスネーク', 'ライノラットスネーク', 'ラオスオオカミヘビ', 'ルスベンキングスネーク', 'キタネコメヘビ', 'クビワヘビ', 'セイブシシバナヘビ', 'トリカラーホグノーズ', 'ナンブシシバナヘビ', 'バロンコダマヘビ', 'ミズコブラモドキ', 'ムスラナ', 'メキシコシシバナヘビ', 'クロスジソウカダ', 'サンタクルズガータースネーク', 'チェッカーガータースネーク', 'トウブガータースネーク', 'プレーンズガータースネーク', 'ヤマカガシ', 'アカオパイプヘビ', 'セイロンパイプヘビ', 'ゴノメアリノハハヘビ', 'テングキノボリヘビ', 'マダガスカルオオブタバナヘビ', 'オオウロコミジカオ', 'カイレクロミジカオ', 'オオミズヘビ', 'キールウミワタリ', 'ヒゲミズヘビ', 'ヒロクチミズヘビ', 'モグラヘビ', 'アラフラヤスリヘビ', 'ジャワヤスリヘビ', 'ヒメヤスリヘビ', 'キールヒメボア', 'キタトラキボア', 'アフリカニシキヘビ', 'アミメニシキヘビ', 'アメジストパイソン', 'アルバーティスパイソン', 'アンゴラパイソン', 'アントヒルパイソン', 'インドニシキヘビ', 'ウォマパイソン', 'オエンペリニシキヘビ', 'オーストラリアヤブニシキヘビ', 'オリーブパイソン', 'カーペットパイソン', 'グリーンパイソン', 'スポッテッドパイソン', 'スマトラブラッドパイソン', 'セントラルカーペットパイソン', 'チモールパイソン', 'チルドレンパイソン', 'ナタールニシキヘビ', 'パプアンパイソン', 'ハルマヘラパイソン', 'ビルマニシキヘビ', 'ブラウンウォーターパイソン', 'ブラックヘッドパイソン', 'ベーレンパイソン', 'ボールパイソン', 'ボルネオブラッドパイソン', 'マクロットパイソン', 'マラヤンブラッドパイソン', 'モエギニシキヘビ', 'モルカンパイソン', 'ラフスケールパイソン', 'リングパイソン', 'カラバリア', 'ケニアサンドボア', 'ジョニーサンドボア', 'タタールサンドボア', 'ナイルスナボア', 'ニシガーツスナボア', 'ホシニラミスナボア', 'ヤハズスナボア', 'ラフスナボア', 'バイパーボア', 'パシフィックグランドボア', 'パシフィックツリーボア', 'ビブロンボア', 'パナマヒラタボア', 'アマゾンツリーボア', 'アルゼンチンレインボーボア', 'エメラルドツリーボア', 'オオアナコンダ', 'キイロアナコンダ', 'キューバボア', 'コロンビアレインボーボア', 'ジャマイカボア', 'チュウベイツリーボア', 'チュウベイボア', 'ハイチボア', 'プエルトリコボア', 'ブラジルレインボーボア', 'ボアコンストリクター', 'リングツリーボア', 'サンジニアボア', 'セイブサンジニアボア', 'デュメリルボア', 'マダガスカルボア', 'ラバーボア', 'ロージーボア'];
      var lizards =['その他', 'リッジテールモニター', 'アフリカンロックモニター（ノドジロ）', 'アフリカンロックモニター（ノドグロ）', 'ピーコックモニター', 'ブラックツリーモニター', 'ショートテールモニター', 'セラムモニター', 'ブルーテールモニター', 'デュメリルモニター', 'サバンナモニター', 'フィンスクモニター', 'ピグミーマルガモニター', 'キンバリーロックモニター', 'グールドモニター', 'マングローブモニター', 'カールシュミットモニター', 'キングヒメオオトカゲ ', 'コルデンシスモニター', 'コバルトモニター', 'イエローヘッドモニター', 'メルテンスモニター', 'ナイルモニター', 'オルナータナイルモニター', 'トーチモニター', 'グレイモニター', 'ピルバラロックモニター', 'ワイゲオツリーモニター', 'ローゼンバーグモニター', 'エメラルドツリーモニター', 'ラフネックモニター', 'サルバトールモニター（ジャワ産）', 'カミンギーモニター', 'コマイニーモニター', 'マルモラータモニター', 'ホワイトヘッドモニター', 'サルバトールモニター', 'トギアンウォーターモニター', 'サンギールモニター', 'サルファモニター', 'サルバトールモニター（オビ島産）', 'シミリスモニター', 'イザベルモニター', 'ストーリーモニター', 'チモールモニター', 'フレックルモニター', 'レースモニター', 'トリカラーモニター', 'キサモニター', 'ボルネオミミナシオオトカゲ', 'フトヒゲカメレオンモドキ', 'ポルカスカメレオンモドキ', 'グリーンバシリスク', 'ミツメイグアナ', 'クビワトカゲ', 'サバククビワトカゲ', 'クラークトゲオイグアナ', 'ユカタントゲオイグアナ', 'サンエステバントゲオイグアナ', 'アグアントゲオイグアナ', 'バナナスパイニーテールイグアナ', 'スベノドトゲオイグアナ', 'ツナギトゲオイグアナ', 'グアテマラスパイニーテールイグアナ', 'ヒョウトカゲ', 'レッサーアンティルイグアナ', 'グリーンイグアナ', 'サバブラックイグアナ', 'セントルシアバンデッドイグアナ', 'キュビエブキオトカゲ', 'ハグルマブキオトカゲ', 'バハブルーロックリザード', 'ノギハラハガクレトカゲ', 'キタチャクワラ', 'エンジェルアイランドチャクワラ', 'メキシコアオハリトカゲ', 'マラカイトハリトカゲ', 'ウラノスコドン', 'ヨウガントカゲ', 'ゼブラテールリザード', 'ジャイアントホーンドリザード', 'ブラコルニエリツノトカゲ', 'テキサスツノトカゲ', 'メキシコツノトカゲ', 'キタサバクツノトカゲ', 'リーガルツノトカゲ', 'マサイヨロイトカゲ', 'アルマジロトカゲ', 'ジョーンズヨロイトカゲ', 'トロピクスヨロイトカゲ', 'エンペラーフラットロックリザード', 'バーベントンワーレンヨロイトカゲ', 'ディプレッサワーレンヨロイトカゲ', 'オオヨロイトカゲ', 'オレンジサイドワーレンヨロイトカゲ', 'グリーンアミーバ', 'リボンハシリトカゲ', 'ムスジハシリトカゲ', 'アルゼンチンブラックアンドホワイトテグー', 'レッドテグー', 'ゴールデンテグー', 'ギアナカイマントカゲ', 'ボスカヘリユビカナヘビ', 'アミメヘリユビカナヘビ', 'トラフソウゲンカナヘビ', 'アイセントラウトカナリアカナヘビ', 'ニシカナリアカナヘビ', 'ジャイアントガロティア', 'ミドリガストロカナヘビ', 'アーガスニワカナヘビ', 'オオミドリカナヘビ', 'ボカージュカベカナヘビ', 'イベリアカベカナヘビ', 'ムラリスカベカナヘビ', 'シクラカベカナヘビ', 'オナガカナヘビ', 'ニホンカナヘビ', 'ホウセキカナヘビ', 'ネバダホウセキカナヘビ', 'ベトナムクシトカゲ', 'ナタリアクシトカゲ', 'レインボーアガマ', 'ユバトカロテス', 'バカエカロテス', 'シロクチカロテス', 'エリマキトカゲ', 'ミヤビキノボリトカゲ', 'ジャワトビトカゲ', 'ベルモリドラゴン', 'カメレオンモリドラゴン', 'ドリアエモリドラゴン', 'アンボイナホカケトカゲ', 'セレベスホカケトカゲ', 'フィリピンホカケトカゲ', 'ハルマヘラホカケトカゲ', 'ソロモンジャイアントミナミモリドラゴン', 'マクロレピスミナミモリドラゴン', 'ノドグロミナミモリドラゴン', 'レッドタイガーバタフライアガマ', 'レイオレピス・ゴーヴァントリイ', 'リーブスバタフライアガマ', 'ディロフスモリドラゴン', 'インドシナウォータードラゴン', 'ヒガシウォータードラゴン', 'オオクチガマトカゲ', 'プシバルスキーカエルアタマアガマ', 'アカツキガマトカゲ', 'ローソンアゴヒゲトカゲ', 'フトアゴヒゲトカゲ', 'イロヌリアガマ', 'ホオスジドラゴン', 'アカンシニュルストゲオアガマ', 'モロッコトゲオアガマ', 'エジプトトゲオアガマ', 'コウロコトゲオアガマ', 'ディスパートゲオアガマ', 'オビトゲオアガマ', 'マリトゲオアガマ', 'ゲイリートゲオアガマ', 'ハードウィッキートゲオアガマ', 'ソマリアトゲオアガマ', 'クジャクトゲオアガマ', 'ニシキトゲオアガマ', 'フィルビートゲオアガマ', 'プリンケプストゲオアガマ', 'トーマストゲオアガマ', 'ゼノガマ', 'サバンナダーツスキンク', 'アストロジャイアントダイビングスキンク', 'アミメミズベトカゲ', 'ミスジアンドロンゴサウルス', 'フレーリーイワトカゲ', 'オオアシカラカネトカゲ', 'オマキトカゲ', 'カニンガムイワトカゲ', 'デプレッサイワトカゲ', 'ホズマーイワトカゲ', 'ストケスイワトカゲ', 'ブラックエモイア', 'クマドリカラタケトカゲ', 'アルジェリアスキンク', 'シュナイダースキンク', 'モモジタトカゲ', 'クロスジエンピツトカゲ', 'ミドリツヤトカゲ', 'ラブリッジクロアシナシスキンク', 'フェルナンデススキンク', 'ニホントカゲ', 'ブラコニエルヒレアシスキンク', 'ピーターズバンデッドスキンク', 'イエメンジャイアントサンドフィッシュ', 'ミトラサンドフィッシュ', 'サンドフィッシュ', 'オマーンサンドフィッシュスキンク', 'ミューラースキンク', 'インドネシアアオジタトカゲ', 'ハルマヘラアオジタトカゲ', 'ケイアオジタトカゲ', 'チュウオウアオジタトカゲ', 'マダラアオジタトカゲ', 'ニシアオジタトカゲ', 'ヒガシマツカサトカゲ', 'ロットネスマツカサトカゲ', 'シャークベイマツカサトカゲ', 'ニシマツカサトカゲ', 'キメラアオジタトカゲ', 'キタアオジタトカゲ', 'ヒガシアオジタトカゲ', 'ゼブラスキンク', 'イツスジマブヤ', 'アカメカブトトカゲ', 'モトイカブトトカゲ', 'スラウェシクロコダイルスキンク', 'シナミズトカゲ', 'ニシオニプレートトカゲ', 'ヒガシオニプレートトカゲ', 'ツェッヒオニプレートトカゲ', 'ニシキカタトカゲ', 'カーステンオビトカゲ', 'ヒラオオビトカゲ', 'カムロオビトカゲ', 'マキシムキングゾノザウルス', 'カザリオビトカゲ', 'ヨスジオビトカゲ', 'シナワニトカゲ', 'メキシココブトカゲ', 'イボヨルトカゲ', 'スミスヨルトカゲ', 'ダンダラミミズトカゲ', 'バルカンミミズトカゲ', 'ヨツユビアホロテトカゲ', 'アラビアミミズトカゲ', 'コモチミミズトカゲ', 'オカアリゲーターリザード', 'ヨーロッパアシナシトカゲ', 'トラキアアシナシトカゲ', 'ハーティアシナシトカゲ'];
      var turtles = ['その他', 'アルダブラゾウガメ', 'ホウシャガメ', 'ケヅメリクガメ', 'ケヅメヒョウモンリクガメ', 'アカアシリクガメ', 'チャコリクガメ', 'キアシリクガメ', 'ソリガメ', 'インドホシガメ', 'セイロンホシガメ', 'ビルマホシガメ', 'テキサスゴファーガメ', 'アナホリゴファーガメ', 'オウムヒラセリクガメ', 'シモフリヒラセリクガメ', 'エロンガータリクガメ', 'セレベスリクガメ', 'ニシベルセオレガメ', 'ホームセオレガメ', 'スピークセオレガメ', 'パンケーキリクガメ', 'スマトラムツアシガメ', 'ビルマムツアシガメ', 'インプレッサムツアシガメ', 'ノコヘリヤブガメ', 'キバラクモノスガメ', 'キタクモノスガメ', 'ミナミクモノスガメ', 'ヒラオリクガメ', 'ヒョウモンリクガメ', 'ナミビアヒョウモンリクガメ', 'ソマリアヒョウモンガメ', 'キレーネリクガメ', 'イベラギリシャリクガメ', 'モロッコギリシャリクガメ', 'スースーギリシャリクガメ', 'イーストアナトリアンジャイアント', 'アラブギリシャリクガメ', 'ヒガシヘルマンリクガメ', 'ニシヘルマンリクガメ', 'アフガンホルスフィールドリクガメ', 'オオフチゾリリクガメ', 'ペロポネソスフチゾリリクガメ', 'ロシアリクガメ', 'ハラガケガメ', 'ハナナガドロガメ', 'アラモスドロガメ', 'ミスジドロガメ', 'ホオアカドロガメ', 'キイロドロガメ', 'ハーレラドロガメ', 'ゴツアシドロガメ', 'チャパラドロガメ', 'シロクチドロガメ', 'キタシロクチドロガメ', 'コガネドロガメ', 'ノドジロドロガメ', 'フロリダドロガメ', 'トウブドロガメ', 'ペンシルバニアドロガメ', 'サルビンオオニオイガメ', 'ジャイアントマスクタートル', 'カブトニオイガメ', 'オオアタマヒメニオイガメ', 'スジクビヒメニオイガメ', 'ミシシッピニオイガメ', 'オオアタマヘビクビガメ', 'トゲモモヘビクビガメ', 'ブチハラヘビクビガメ', 'クロハラヘビクビガメ', 'カンナガクビガメ', 'グナレンナガクビガメ', 'オーストラリアナガクビガメ', 'マッコードナガクビガメ', 'チモールナガクビガメ', 'ニューギニアナガクビガメ', 'コウホソナガクビガメ', 'ライマンナガクビガメ', 'ジーベンロックナガクビガメ', 'マタマタ', 'ブランデルカブトガメ', 'シロガオカブトガメ', 'ニューギニアカブトガメ', 'サウスイリアンカブトガメ', 'シュルツカブトガメ', 'キンバリーアカミミマゲクビガメ', 'クレフトマゲクビガメ', 'ニシキマゲクビガメ', 'ブラジルヘビクビガメ', 'ギザミネヘビクビガメ', 'エキスパンサーナガクビガメ', 'パーケリーナガクビガメ', 'ジェフロアカエルガメ', 'キタジェフロアカエルガメ', 'ミナミジェフロアカエルガメ', 'ヒメカエルガメ', 'ヒラリーカエルガメ', 'ナスタカエルガメ', 'アマゾンカエルガメ', 'コシヒロカエルガメ', 'へーゲカエルガメ', 'セグロヒラタヘビクビガメ', 'ズアカヒラタヘビクビガメ', 'マダガスカルヨコクビガメ', 'アフリカヌマヨコクビガメ', 'オオアタマヨコクビガメ', 'アダンソンハコヨコクビガメ', 'オカバンゴハコヨコクビガメ', 'トゥルカナハコヨコクビガメ', 'クリイロハコヨコクビガメ', 'シロガオハコヨコクビガメ', 'ヒメハコヨコクビガメ', 'コガネハコヨコクビガメ', 'ノコヘリハコヨコクビガメ', 'アフリカウスグロハコヨコクビガメ', 'ウペンバハコヨコクビガメ', 'オオヨコクビガメ', 'カイエンズアカヨコクビガメ', 'ムツコブヨコクビガメ', 'モンキヨコクビガメ', 'サバンナヨコクビガメ', 'ブチイシガメ', 'セスジニシキガメ', 'キボシイシガメ', 'フロリダチキンタートル', 'ブランディングタートル', 'サルディーニャヌマガメ', 'キボシヌマガメ', 'モリイシガメ', 'バーバーチズガメ', 'ケイグルチズガメ', 'キマダラチズガメ', 'ヒラチズガメ', 'ギボンチズガメ', 'デルタクロコブチズガメ', 'キタクロコブチズガメ', 'ワモンチズガメ', 'フトマユチズガメ', 'ニセチズガメ', 'ハイイロチズガメ', 'アラバマチズガメ', 'テキサスチズガメ', 'カロリナダイヤモンドバックテラピン', 'テキサスダイヤモンドバックテラピン', 'オルナータダイヤモンドバックテラピン', 'ミシシッピダイヤモンドバックテラピン', 'マングローブダイヤモンドバックテラピン', 'フロリダダイヤモンドバックテラピン', 'ノーザンダイヤモンドバックテラピン', 'アラバマアカハラガメ', 'リバークーター', 'リオグランデクーター', 'フロリダアカハラガメ', 'フロリダハコガメ', 'トウブハコガメ', 'ガルフコーストハコガメ', 'メキシコハコガメ', 'ミツユビハコガメ', 'ユカタンハコガメ', 'ミナミニシキハコガメ', 'キタニシキハコガメ', 'コロンビアクジャクガメ', 'キューバスライダー', 'アルゼンチンクジャクガメ', 'ミシシッピアカミミガメ', 'キバラガメ', 'カンバーランドキミミガメ', 'タバスコクジャクガメ', 'カラグールガメ', 'オオセタカガメ', 'ニシキセタカガメ', 'アンボイナハコガメ', 'ジャワハコガメ', 'シャムハコガメ', 'ビルマハコガメ', 'タイワンセマルハコガメ', 'チュウゴクセマルハコガメ', 'ラオスモエギハコガメ', 'クロハラモエギハコガメ', 'マッコードハコガメ', 'モンホットハコガメ', 'ムオヒラセガメ', 'オプストヒラセガメ', 'ミスジハコガメ', 'ノコヘリマルガメ', 'ミナミクロハラマルガメ', 'インドクロハラマルガメ', 'オルダムマルガメ', 'スジクビマルガメ', 'スペングラーヤマガメ', 'シロアゴヤマガメ', 'インダスカンムリガメ', 'ヒジリガメ', 'オオヤマガメ', 'トゲヤマガメ', 'マレーニシクイガメ', 'アンナンガメ', 'カスピイシガメ', 'ニホンイシガメ', 'スペインイシガメ', 'モロッコイシガメ', 'サハライシガメ', 'ヤエヤマミナミイシガメ', 'ミナミイシガメ', 'カントンクサガメ', 'クサガメ', 'ウンキュウ', 'ギリシャイシガメ', 'ハナガメ', 'トラバンコアヤマガメ', 'セイロンヤマガメ', 'ピーターズメダマガメ', 'ムツイタガメ', 'ボルネオカワガメ', 'シロアシセタカガメ', 'アッサムセタカガメ', 'ベニマワリセタカガメ', 'キバラセタカガメ', 'グァテマラアカスジヤマガメ', 'コスタリカアカスジヤマガメ', 'メキシコアカスジヤマガメ', 'ジャノメイシガメ', 'ヨツメイシガメ', 'ホオジロクロガメ', 'レイテヤマガメ', 'チュウゴクオオアタマガメ', 'ビルマオオアタマガメ', 'シウイオオアタマガメ', 'ボーグリーオオアタマガメ', 'ワニガメ', 'インドシナオオスッポン', 'フロリダスッポン', 'カンチャナブリコガシラスッポン', 'インドコガシラスッポン', 'ヒラタスッポン', 'キタインドハコスッポン', 'ミナミインドハコスッポン', 'ビルマハコスッポン', 'ハナマルスッポン', 'カントールマルスッポン', 'ゴマダラマルスッポン', 'シナスッポン', 'ナイルスッポン', 'スッポンモドキ', 'メキシコカワガメ'];
      var geckos = ['その他', 'マレーシアキャットゲッコー', 'ボルネオキャットゲッコー', 'ボウシトカゲモドキ', 'オバケトカゲモドキ', 'ヒョウモントカゲモドキ', 'アシナガトカゲモドキ', 'バワンリントカゲモドキ', 'ハイナントカゲモドキ', 'ゴマバラトカゲモドキ', 'ニシアフリカトカゲモドキ', 'ヒガシアフリカトカゲモドキ', 'ボイヴィンネコツメヤモリ', 'グローブヤモリ', 'ナミブグローブヤモリ', 'イトコホソユビヤモリ', 'エロークホソユビヤモリ', 'ジャワホソユビヤモリ', 'マレーホソユビヤモリ', 'ヨスジホソユビヤモリ', 'トゲオボウユビヤモリ', 'オオバクチヤモリ', 'ハルマヘラジャイアントゲッコー', 'トッケイヤモリ', 'マーブルゲッコー', 'ニホンヤモリ', 'ゴールデンゲッコー', 'ホワイトラインゲッコー', 'キバラナキヤモリ', 'アリヅカナキヤモリ', 'ヒガシアフリカネコツメヤモリ', 'キガシラマルメヤモリ', 'ブルーゲッコー', 'サラマンダーゲッコー', 'ビブロンゲッコー', 'ミズカキヤモリ', 'バスタールササクレヤモリ', 'マソベササクレヤモリ', 'ソメワケササクレヤモリ', 'シュトゥンプフササクレヤモリ', 'ヒロオヒルヤモリ', 'ヘリスジヒルヤモリ', 'ベーメオオヒルヤモリ', 'グランディスヒルヤモリ', 'ヨツメヒルヤモリ', 'スタンディングヒルヤモリ', 'パラシュートゲッコー', 'ペトリボウユビヤモリ', 'エレガンスボウユビヤモリ', 'マツカサヤモリ', 'ヤマビタイヘラオヤモリ', 'ノシボラハヘラオヤモリ', 'オニタマオヤモリ', 'デレアニタマオヤモリ', 'ナメハダタマオヤモリ', 'ピルバラナメハダタマオヤモリ', 'オビタマオヤモリ', 'リングテールリーフゲッコー', 'アンダーウッディサウルス', 'ゴマフウチワヤモリ', 'ヘルメットゲッコー', 'クラカケカベヤモリ', 'セントマーチンカブラオヤモリ', 'キガシライロワケヤモリ', 'カータートゲオヤモリ', 'プシバルスキースキンクヤモリ', 'ロボロフスキースキンクヤモリ', 'ババイヤゲイタイナ', 'クレステッドゲッコー', 'サラシノミカドヤモリ', 'ガレアータスイシヤモリ', 'セスジイシヤモリ', 'アグリコラクチサケヤモリ', 'アカジタミドリヤモリ', 'チャホアミカドヤモリ', 'ハスオビビロードヤモリ', 'オセラータビロードヤモリ', 'ガーゴイルゲッコー', 'ニューカレドニアジャイアントゲッコー（ヘンケリ）', 'ニューカレドニアジャイアントゲッコー（グランテラ）', 'コモチミカドヤモリ', 'マツゲイシヤモリ', 'ヤワトゲイシヤモリ', 'ジカリーヒレアシトカゲ'];
      var chameleons = ['その他', 'ショートホーンカメレオン', 'マルテカメレオン', 'クリストファーパーソンカメレオン', 'パーソンカメレオン', 'ツーストライプカメレオン', 'エボシカメレオン', 'デレマカメレオン', 'ディレピスカメレオン', 'ヘルメットカメレオン', 'ジャクソンカメレオン', 'メルモンタヌスジャクソンカメレオン', 'キサントロプスジャクソンカメレオン', 'メラーカメレオン', 'ヤマカメレオン', 'ルディスカメレオン', 'セネガルカメレオン', 'ワーナーカメレオン', 'カーペットカメレオン', 'ウスタレカメレオン', 'パンサーカメレオン', 'スパイニーカメレオン', 'ウィルズカメレオン', 'トランスバールドワーフカメレオン', 'フィッシャーカメレオン', 'ヒゲコノハカメレオン', 'ソマリコノハカメレオン', 'デカリーヒメカメレオン'];
      var others = ['その他'];

      var selectElement = document.getElementById('pet_breed');
      selectElement.innerHTML = ""; // Clear current options

      var newOptions;
      switch(selectedCategory) {
        case 'snake':
          newOptions = snakes;
          break;
        case 'lizard':
          newOptions = lizards;
          break;
        case 'turtle':
          newOptions = turtles;
          break;
        case 'gecko':
          newOptions = geckos;
          break;
        case 'chameleon':
          newOptions = chameleons;
          break;
        case 'others':
          newOptions = others;
          break;
        default:
          newOptions = [];
          break;
      }

      newOptions.forEach(function(optionText) {
        var option = new Option(optionText, optionText);
        selectElement.add(option);
      });

      $(selectElement).select2(); // Reinitialize Select2 to reflect new options
    });
  }
});

// datepicker
document.addEventListener("turbo:load", function() {
  var startDateInput = document.getElementById('start_date');
  var endDateInput = document.getElementById('end_date');
  if (startDateInput && endDateInput) {
    $('#start_date, #end_date').datepicker({
      dateFormat: 'yy-mm-dd'
    });
  }
});

// Chart.js implementation
document.addEventListener("turbo:load", function() {
  var chartElements = document.querySelectorAll('[id^="chart-"]');
  if (chartElements.length > 0) {
    chartElements.forEach(function(chartElement) {
      var petId = chartElement.getAttribute('data-pet-id');
      var weightData = JSON.parse(chartElement.getAttribute('data-weight-data'));

      console.log("weightData:", weightData);

      if (chartElement) {
        if (chartElement.chart) {
          chartElement.chart.destroy();
        }

        var chart = new Chart(chartElement, {
          type: 'line',
          data: {
            datasets: [{
              label: '体重記録',
              data: weightData,
              borderColor: 'rgb(75, 192, 192)',
              fill: false
            }]
          },
          options: {
            scales: {
              x: {
                type: 'time',
                time: {
                  unit: 'day',
                  displayFormats: {
                    day: 'M/d'
                  },
                  tooltipFormat: 'M/d'
                },
                title: {
                  display: true,
                  text: '日付',
                  color: '#000',
                  font: {
                    size: 14
                  }
                }
              },
              y: {
                title: {
                  display: true,
                  text: '体重 (g)',
                  color: '#000',
                  font: {
                    size: 14
                  }
                }
              }
            },
            plugins: {
              tooltip: {
                callbacks: {
                  label: function(tooltipItem) {
                    return tooltipItem.formattedValue + ' g';
                  }
                }
              }
            },
            onClick: function(event, elements) {
              if (elements.length > 0) {
                var index = elements[0].index;
                var weightRecordId = weightData[index].id;
                window.location.href = '/pets/' + petId + '/weight_records/' + weightRecordId + '/edit';
              }
            }
          }
        });

        chartElement.chart = chart;
      }
    });
  }
});

// Events Questions image upload
document.addEventListener("turbo:load", function() {
  // 画像アップロードとプレビューの設定
  function setupImageUpload(containerSelector, inputSelector, previewSelector, removeIconSelector, removeEndpoint) {
    var container = document.querySelector(containerSelector);
    if (!container) return;

    var fileInputs = container.querySelectorAll(inputSelector);
    var imagePreviews = container.querySelectorAll(previewSelector);
    var removeIcons = container.querySelectorAll(removeIconSelector);
    var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    fileInputs.forEach((fileInput, index) => {
      var imagePreview = imagePreviews[index];
      if (!imagePreview.dataset.listenerAdded) {
        imagePreview.addEventListener('click', function(event) {
          event.stopPropagation();
          console.log(`Image preview clicked for index: ${index}`);
          fileInput.click();
        });

        fileInput.addEventListener('change', function() {
          console.log(`File input changed for index: ${index}`);
          if (fileInput.files && fileInput.files[0]) {
            console.log(`File selected for index: ${index}`);
            var reader = new FileReader();
            reader.onload = function(e) {
              console.log(`FileReader onload triggered for index: ${index}`);
              imagePreview.src = e.target.result;
              console.log(`Image preview updated for index: ${index}`);
            };
            reader.readAsDataURL(fileInput.files[0]);
            console.log(`FileReader readAsDataURL called for index: ${index}`);
          } else {
            console.log(`No file selected for index: ${index}`);
          }
        });

        imagePreview.dataset.listenerAdded = "true";
      }
    });

    removeIcons.forEach((icon, index) => {
      if (!icon.dataset.listenerAdded) {
        icon.addEventListener('click', function(event) {
          event.stopPropagation();
          var iconIndex = this.getAttribute('data-index');
          var questionId = container.getAttribute('data-question-id');
          var eventId = container.getAttribute('data-event-id');
          var petId = container.getAttribute('data-pet-id');
          console.log(`Removing image at index: ${iconIndex}`);

          var endpoint;
          if (questionId) {
            endpoint = `/questions/${questionId}/remove_image?index=${iconIndex}`;
          } else if (eventId && petId) {
            endpoint = `/pets/${petId}/events/${eventId}/remove_image?index=${iconIndex}`;
          }

          fetch(endpoint, {
            method: 'DELETE',
            headers: {
              'X-CSRF-Token': csrfToken,
              'Content-Type': 'application/json'
            },
            redirect: 'follow'
          })
          .then(response => response.json())
          .then(data => {
            if (data.status === 'success') {
              console.log(`Image removed successfully at index: ${iconIndex}`);
              imagePreviews[iconIndex].src = '/assets/forum_default_image.png';
              fileInputs[iconIndex].value = '';
            } else {
              console.error(`Failed to remove image at index: ${iconIndex}`);
            }
          })
          .catch(error => {
            console.error(`Error removing image at index: ${iconIndex}`, error);
          });
        });

        icon.dataset.listenerAdded = "true";
      }
    });
  }

  // Question pages
  if (document.querySelector('.new-question-container')) {
    setupImageUpload('.new-question-container', '.file-input', '.image-upload', '.remove-icon', '/questions/remove_image');
  }

  if (document.querySelector('.new-question-container[data-question-id]')) {
    setupImageUpload('.new-question-container[data-question-id]', '.file-input', '.image-upload', '.remove-icon', '/questions/remove_image');
  }

  // Event pages
  if (document.querySelector('.edit-event-container')) {
    setupImageUpload('.edit-event-container', '.file-input', '.image-upload', '.remove-icon', '');
  }

  if (document.querySelector('.new-event-container')) {
    setupImageUpload('.new-event-container', '.file-input', '.image-upload', '.remove-icon', '');
  }
});

// Notification dropdown
document.addEventListener("turbo:load", function() {
  var notificationIcon = document.getElementById('notification-icon');
  var notificationDropdown = document.getElementById('notification-dropdown');

  if (notificationIcon && notificationDropdown) {
    notificationIcon.addEventListener('click', function(event) {
      event.preventDefault();
      notificationDropdown.style.display = notificationDropdown.style.display === 'none' ? 'block' : 'none';
    });

    document.addEventListener('click', function(event) {
      if (!notificationIcon.contains(event.target) && !notificationDropdown.contains(event.target)) {
        notificationDropdown.style.display = 'none';
      }
    });
  }
});

// Answer textarea expansion
document.addEventListener("turbo:load", function() {
  var answerTextarea = document.getElementById("answer-textarea");
  var answerSubmit = document.getElementById("answer-submit");

  if (answerTextarea && answerSubmit) {
    answerTextarea.addEventListener("focus", function() {
      answerTextarea.classList.add("expanded");
      answerSubmit.style.display = "block";
    });

    answerTextarea.addEventListener("blur", function() {
      if (answerTextarea.value.trim() === "") {
        answerTextarea.classList.remove("expanded");
        answerSubmit.style.display = "none";
      }
    });
  }
});

// Like button functionality
document.addEventListener("turbo:load", function() {
  document.querySelectorAll('.like-icon').forEach(function(icon) {
    icon.addEventListener('click', function(event) {
      event.preventDefault();
      const url = this.dataset.url;
      const method = this.dataset.method;

      fetch(url, {
        method: method.toUpperCase(),
        headers: {
          'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        this.classList.toggle('liked');
        this.dataset.url = data.new_url;
        this.dataset.method = data.new_method;
        this.nextElementSibling.textContent = data.likes_count;
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
    });
  });
});

// Avatar upload preview for profiles
document.addEventListener("turbo:load", function() {
  function setupAvatarUpload(containerSelector, inputSelector, previewSelector) {
    var container = document.querySelector(containerSelector);
    if (!container) return;

    var avatarPreview = container.querySelector(previewSelector);
    var fileInput = container.querySelector(inputSelector);

    if (avatarPreview && fileInput) {
      // Check if the event listeners are already added
      if (!fileInput.dataset.listenersAdded) {
        avatarPreview.addEventListener('click', function(event) {
          event.stopPropagation();
          console.log('Avatar preview clicked');
          fileInput.click();
        });

        fileInput.addEventListener('change', function() {
          console.log('File input changed');
          if (fileInput.files && fileInput.files[0]) {
            console.log('File selected');
            var reader = new FileReader();
            reader.onload = function(e) {
              console.log('FileReader onload triggered');
              avatarPreview.src = e.target.result;
              console.log('Avatar preview updated');
            };
            reader.readAsDataURL(fileInput.files[0]);
            console.log('FileReader readAsDataURL called');
          } else {
            console.log('No file selected');
          }
        });

        // Mark the listeners as added
        fileInput.dataset.listenersAdded = 'true';
      }
    } else {
      console.log('Avatar preview or file input element not found.');
    }
  }

  // Setup avatar upload for profile pages
  setupAvatarUpload('.edit_profile', '#profile_avatar_input', '#profile_avatar_preview');
  setupAvatarUpload('.new_profile', '#profile_avatar_input', '#profile_avatar_preview');
});


// // Avatar upload preview
// document.addEventListener("turbo:load", function() {
//   var avatarPreview = document.getElementById('avatar-preview');
//   var fileField = document.getElementById('profile_avatar');

//   if (avatarPreview && fileField) {
//     avatarPreview.addEventListener('click', function() {
//       fileField.click();
//     });

//     fileField.addEventListener('change', function(event) {
//       var reader = new FileReader();
//       reader.onload = function(e) {
//         avatarPreview.src = e.target.result;
//       };
//       reader.readAsDataURL(event.target.files[0]);
//     });
//   } else {
//     console.log('Avatar preview or file field element not found.');
//   }
// });

// humbarger menu
document.addEventListener("turbo:load", function() {
  var hamburger = document.querySelector('.hamburger');
  var slidebar = document.querySelector('.slidebar');

  if (hamburger && slidebar) {
      hamburger.addEventListener('click', function() {
          slidebar.classList.toggle('active');
          hamburger.classList.toggle('active'); // アイコンのスタイル変更
      });
  }
});
