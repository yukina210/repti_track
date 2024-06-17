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
  var avatarPreview = document.getElementById('avatar-preview');
  var fileInput = document.getElementById('profile_avatar');

  if (avatarPreview && fileInput) {
    // When the avatar preview is clicked, trigger the file input
    avatarPreview.addEventListener('click', function() {
      fileInput.click();
    });

    // Function to update the avatar preview
    function updateAvatarPreview(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
          document.getElementById('avatar-preview').src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    }

    // Set the onchange event to update the preview
    fileInput.onchange = function() {
      updateAvatarPreview(this);
    };
  }

  var roleSelect = document.getElementById('pet_category');

  if (roleSelect) {
    roleSelect.addEventListener('change', function() {
      var selectedCategory = this.value;
      var snakes=['オリーブアレチヘビ', 'サビイロクチバシヘビ', 'モイラヘビ', 'モンペリエヘビ', 'アフリカンハウススネーク', 'ブラックハウススネーク', 'タカチホヘビ', 'ドラゴンスネーク', 'ガボンアダー', 'ツノスナクサリヘビ', 'パフアダー', 'ヨーロッパクサリヘビ', 'ラッセルクサリヘビ', 'アメリカヒメガラガラ', 'カパーヘッド', 'ニホンマムシ', 'ヌママムシ', 'ハブ', 'ブッシュマスター', 'マツゲハブ', 'ヨロイハブ', 'インドコブラ', 'エジプトコブラ', 'キングコブラ', 'ケープコブラ', 'ブラックマンバ', 'モノクルコブラ', 'リンカルス', 'サンゴパイプヘビ', 'サンビームヘビ', 'オオアオムチヘビ', 'ゴールデントビヘビ', 'ニシキブロンズヘビ', 'ハナナガムチヘビ', 'アオダイショウ', 'アカマダラ', 'アフリカタマゴヘビ', 'アムールラットスネーク', 'アリゾナマウンテンキングスネーク', 'イースタンインディゴスネーク', 'イエローテールクリボー', 'ウェスタンラットスネーク', 'エモリーラットスネーク', 'オオカサントウ', 'オグロクリボー', 'カリフォルニアキングスネーク', 'カワリシノビヘビ', 'ガンスタマゴヘビ', 'グァテマラミルクスネーク', 'クチベニヘビ', 'グレーバンドキングスネーク', 'ケープゴファースネーク', 'コーンスネーク', 'ゴファースネーク', 'コモンキングヘビ', 'サラサナメラ', 'サンルイスポトシキングヘビ', 'シナククリィヘビ', 'シマヘビ', 'ジムグリ', 'ジャンセンラットスネーク', 'シュウダ', 'シロマダラ', 'スジメアオナメラ', 'スペックルドキングスネーク', 'タイガーラットスネーク', 'タイワンアオヘビ', 'タカサゴナメラ', 'トランスペコスラットスネーク', 'ナンダ', 'パインヘビ', 'ヒメナンダ', 'ヒョウモンナメラ', 'ブームスラング', 'プレーリーキングスネーク', 'ベアードラットスネーク', 'ベニナメラ', 'ホウシャナメラ', 'ホソツラナメラ', 'マングローブヘビ', 'ミナミオオガシラ', 'ミルクヘビ', 'メキシカンミルクスネーク', 'ライノラットスネーク', 'ラオスオオカミヘビ', 'ルスベンキングスネーク', 'キタネコメヘビ', 'クビワヘビ', 'セイブシシバナヘビ', 'トリカラーホグノーズ', 'ナンブシシバナヘビ', 'バロンコダマヘビ', 'ミズコブラモドキ', 'ムスラナ', 'メキシコシシバナヘビ', 'クロスジソウカダ', 'サンタクルズガータースネーク', 'チェッカーガータースネーク', 'トウブガータースネーク', 'プレーンズガータースネーク', 'ヤマカガシ', 'アカオパイプヘビ', 'セイロンパイプヘビ', 'ゴノメアリノハハヘビ', 'テングキノボリヘビ', 'マダガスカルオオブタバナヘビ', 'オオウロコミジカオ', 'カイレクロミジカオ', 'オオミズヘビ', 'キールウミワタリ', 'ヒゲミズヘビ', 'ヒロクチミズヘビ', 'モグラヘビ', 'アラフラヤスリヘビ', 'ジャワヤスリヘビ', 'ヒメヤスリヘビ', 'キールヒメボア', 'キタトラキボア', 'アフリカニシキヘビ', 'アミメニシキヘビ', 'アメジストパイソン', 'アルバーティスパイソン', 'アンゴラパイソン', 'アントヒルパイソン', 'インドニシキヘビ', 'ウォマパイソン', 'オエンペリニシキヘビ', 'オーストラリアヤブニシキヘビ', 'オリーブパイソン', 'カーペットパイソン', 'グリーンパイソン', 'スポッテッドパイソン', 'スマトラブラッドパイソン', 'セントラルカーペットパイソン', 'チモールパイソン', 'チルドレンパイソン', 'ナタールニシキヘビ', 'パプアンパイソン', 'ハルマヘラパイソン', 'ビルマニシキヘビ', 'ブラウンウォーターパイソン', 'ブラックヘッドパイソン', 'ベーレンパイソン', 'ボールパイソン', 'ボルネオブラッドパイソン', 'マクロットパイソン', 'マラヤンブラッドパイソン', 'モエギニシキヘビ', 'モルカンパイソン', 'ラフスケールパイソン', 'リングパイソン', 'カラバリア', 'ケニアサンドボア', 'ジョニーサンドボア', 'タタールサンドボア', 'ナイルスナボア', 'ニシガーツスナボア', 'ホシニラミスナボア', 'ヤハズスナボア', 'ラフスナボア', 'バイパーボア', 'パシフィックグランドボア', 'パシフィックツリーボア', 'ビブロンボア', 'パナマヒラタボア', 'アマゾンツリーボア', 'アルゼンチンレインボーボア', 'エメラルドツリーボア', 'オオアナコンダ', 'キイロアナコンダ', 'キューバボア', 'コロンビアレインボーボア', 'ジャマイカボア', 'チュウベイツリーボア', 'チュウベイボア', 'ハイチボア', 'プエルトリコボア', 'ブラジルレインボーボア', 'ボアコンストリクター', 'リングツリーボア', 'サンジニアボア', 'セイブサンジニアボア', 'デュメリルボア', 'マダガスカルボア', 'ラバーボア', 'ロージーボア', 'その他'];
      var lizards =['リッジテールモニター', 'アフリカンロックモニター（ノドジロ）', 'アフリカンロックモニター（ノドグロ）', 'ピーコックモニター', 'ブラックツリーモニター', 'ショートテールモニター', 'セラムモニター', 'ブルーテールモニター', 'デュメリルモニター', 'サバンナモニター', 'フィンスクモニター', 'ピグミーマルガモニター', 'キンバリーロックモニター', 'グールドモニター', 'マングローブモニター', 'カールシュミットモニター', 'キングヒメオオトカゲ ', 'コルデンシスモニター', 'コバルトモニター', 'イエローヘッドモニター', 'メルテンスモニター', 'ナイルモニター', 'オルナータナイルモニター', 'トーチモニター', 'グレイモニター', 'ピルバラロックモニター', 'ワイゲオツリーモニター', 'ローゼンバーグモニター', 'エメラルドツリーモニター', 'ラフネックモニター', 'サルバトールモニター（ジャワ産）', 'カミンギーモニター', 'コマイニーモニター', 'マルモラータモニター', 'ホワイトヘッドモニター', 'サルバトールモニター', 'トギアンウォーターモニター', 'サンギールモニター', 'サルファモニター', 'サルバトールモニター（オビ島産）', 'シミリスモニター', 'イザベルモニター', 'ストーリーモニター', 'チモールモニター', 'フレックルモニター', 'レースモニター', 'トリカラーモニター', 'キサモニター', 'ボルネオミミナシオオトカゲ', 'フトヒゲカメレオンモドキ', 'ポルカスカメレオンモドキ', 'グリーンバシリスク', 'ミツメイグアナ', 'クビワトカゲ', 'サバククビワトカゲ', 'クラークトゲオイグアナ', 'ユカタントゲオイグアナ', 'サンエステバントゲオイグアナ', 'アグアントゲオイグアナ', 'バナナスパイニーテールイグアナ', 'スベノドトゲオイグアナ', 'ツナギトゲオイグアナ', 'グアテマラスパイニーテールイグアナ', 'ヒョウトカゲ', 'レッサーアンティルイグアナ', 'グリーンイグアナ', 'サバブラックイグアナ', 'セントルシアバンデッドイグアナ', 'キュビエブキオトカゲ', 'ハグルマブキオトカゲ', 'バハブルーロックリザード', 'ノギハラハガクレトカゲ', 'キタチャクワラ', 'エンジェルアイランドチャクワラ', 'メキシコアオハリトカゲ', 'マラカイトハリトカゲ', 'ウラノスコドン', 'ヨウガントカゲ', 'ゼブラテールリザード', 'ジャイアントホーンドリザード', 'ブラコルニエリツノトカゲ', 'テキサスツノトカゲ', 'メキシコツノトカゲ', 'キタサバクツノトカゲ', 'リーガルツノトカゲ', 'マサイヨロイトカゲ', 'アルマジロトカゲ', 'ジョーンズヨロイトカゲ', 'トロピクスヨロイトカゲ', 'エンペラーフラットロックリザード', 'バーベントンワーレンヨロイトカゲ', 'ディプレッサワーレンヨロイトカゲ', 'オオヨロイトカゲ', 'オレンジサイドワーレンヨロイトカゲ', 'グリーンアミーバ', 'リボンハシリトカゲ', 'ムスジハシリトカゲ', 'アルゼンチンブラックアンドホワイトテグー', 'レッドテグー', 'ゴールデンテグー', 'ギアナカイマントカゲ', 'ボスカヘリユビカナヘビ', 'アミメヘリユビカナヘビ', 'トラフソウゲンカナヘビ', 'アイセントラウトカナリアカナヘビ', 'ニシカナリアカナヘビ', 'ジャイアントガロティア', 'ミドリガストロカナヘビ', 'アーガスニワカナヘビ', 'オオミドリカナヘビ', 'ボカージュカベカナヘビ', 'イベリアカベカナヘビ', 'ムラリスカベカナヘビ', 'シクラカベカナヘビ', 'オナガカナヘビ', 'ニホンカナヘビ', 'ホウセキカナヘビ', 'ネバダホウセキカナヘビ', 'ベトナムクシトカゲ', 'ナタリアクシトカゲ', 'レインボーアガマ', 'ユバトカロテス', 'バカエカロテス', 'シロクチカロテス', 'エリマキトカゲ', 'ミヤビキノボリトカゲ', 'ジャワトビトカゲ', 'ベルモリドラゴン', 'カメレオンモリドラゴン', 'ドリアエモリドラゴン', 'アンボイナホカケトカゲ', 'セレベスホカケトカゲ', 'フィリピンホカケトカゲ', 'ハルマヘラホカケトカゲ', 'ソロモンジャイアントミナミモリドラゴン', 'マクロレピスミナミモリドラゴン', 'ノドグロミナミモリドラゴン', 'レッドタイガーバタフライアガマ', 'レイオレピス・ゴーヴァントリイ', 'リーブスバタフライアガマ', 'ディロフスモリドラゴン', 'インドシナウォータードラゴン', 'ヒガシウォータードラゴン', 'オオクチガマトカゲ', 'プシバルスキーカエルアタマアガマ', 'アカツキガマトカゲ', 'ローソンアゴヒゲトカゲ', 'フトアゴヒゲトカゲ', 'イロヌリアガマ', 'ホオスジドラゴン', 'アカンシニュルストゲオアガマ', 'モロッコトゲオアガマ', 'エジプトトゲオアガマ', 'コウロコトゲオアガマ', 'ディスパートゲオアガマ', 'オビトゲオアガマ', 'マリトゲオアガマ', 'ゲイリートゲオアガマ', 'ハードウィッキートゲオアガマ', 'ソマリアトゲオアガマ', 'クジャクトゲオアガマ', 'ニシキトゲオアガマ', 'フィルビートゲオアガマ', 'プリンケプストゲオアガマ', 'トーマストゲオアガマ', 'ゼノガマ', 'サバンナダーツスキンク', 'アストロジャイアントダイビングスキンク', 'アミメミズベトカゲ', 'ミスジアンドロンゴサウルス', 'フレーリーイワトカゲ', 'オオアシカラカネトカゲ', 'オマキトカゲ', 'カニンガムイワトカゲ', 'デプレッサイワトカゲ', 'ホズマーイワトカゲ', 'ストケスイワトカゲ', 'ブラックエモイア', 'クマドリカラタケトカゲ', 'アルジェリアスキンク', 'シュナイダースキンク', 'モモジタトカゲ', 'クロスジエンピツトカゲ', 'ミドリツヤトカゲ', 'ラブリッジクロアシナシスキンク', 'フェルナンデススキンク', 'ニホントカゲ', 'ブラコニエルヒレアシスキンク', 'ピーターズバンデッドスキンク', 'イエメンジャイアントサンドフィッシュ', 'ミトラサンドフィッシュ', 'サンドフィッシュ', 'オマーンサンドフィッシュスキンク', 'ミューラースキンク', 'インドネシアアオジタトカゲ', 'ハルマヘラアオジタトカゲ', 'ケイアオジタトカゲ', 'チュウオウアオジタトカゲ', 'マダラアオジタトカゲ', 'ニシアオジタトカゲ', 'ヒガシマツカサトカゲ', 'ロットネスマツカサトカゲ', 'シャークベイマツカサトカゲ', 'ニシマツカサトカゲ', 'キメラアオジタトカゲ', 'キタアオジタトカゲ', 'ヒガシアオジタトカゲ', 'ゼブラスキンク', 'イツスジマブヤ', 'アカメカブトトカゲ', 'モトイカブトトカゲ', 'スラウェシクロコダイルスキンク', 'シナミズトカゲ', 'ニシオニプレートトカゲ', 'ヒガシオニプレートトカゲ', 'ツェッヒオニプレートトカゲ', 'ニシキカタトカゲ', 'カーステンオビトカゲ', 'ヒラオオビトカゲ', 'カムロオビトカゲ', 'マキシムキングゾノザウルス', 'カザリオビトカゲ', 'ヨスジオビトカゲ', 'シナワニトカゲ', 'メキシココブトカゲ', 'イボヨルトカゲ', 'スミスヨルトカゲ', 'ダンダラミミズトカゲ', 'バルカンミミズトカゲ', 'ヨツユビアホロテトカゲ', 'アラビアミミズトカゲ', 'コモチミミズトカゲ', 'オカアリゲーターリザード', 'ヨーロッパアシナシトカゲ', 'トラキアアシナシトカゲ', 'ハーティアシナシトカゲ', 'その他'];
      var turtles = ['アルダブラゾウガメ', 'ホウシャガメ', 'ケヅメリクガメ', 'ケヅメヒョウモンリクガメ', 'アカアシリクガメ', 'チャコリクガメ', 'キアシリクガメ', 'ソリガメ', 'インドホシガメ', 'セイロンホシガメ', 'ビルマホシガメ', 'テキサスゴファーガメ', 'アナホリゴファーガメ', 'オウムヒラセリクガメ', 'シモフリヒラセリクガメ', 'エロンガータリクガメ', 'セレベスリクガメ', 'ニシベルセオレガメ', 'ホームセオレガメ', 'スピークセオレガメ', 'パンケーキリクガメ', 'スマトラムツアシガメ', 'ビルマムツアシガメ', 'インプレッサムツアシガメ', 'ノコヘリヤブガメ', 'キバラクモノスガメ', 'キタクモノスガメ', 'ミナミクモノスガメ', 'ヒラオリクガメ', 'ヒョウモンリクガメ', 'ナミビアヒョウモンリクガメ', 'ソマリアヒョウモンガメ', 'キレーネリクガメ', 'イベラギリシャリクガメ', 'モロッコギリシャリクガメ', 'スースーギリシャリクガメ', 'イーストアナトリアンジャイアント', 'アラブギリシャリクガメ', 'ヒガシヘルマンリクガメ', 'ニシヘルマンリクガメ', 'アフガンホルスフィールドリクガメ', 'オオフチゾリリクガメ', 'ペロポネソスフチゾリリクガメ', 'ロシアリクガメ', 'ハラガケガメ', 'ハナナガドロガメ', 'アラモスドロガメ', 'ミスジドロガメ', 'ホオアカドロガメ', 'キイロドロガメ', 'ハーレラドロガメ', 'ゴツアシドロガメ', 'チャパラドロガメ', 'シロクチドロガメ', 'キタシロクチドロガメ', 'コガネドロガメ', 'ノドジロドロガメ', 'フロリダドロガメ', 'トウブドロガメ', 'ペンシルバニアドロガメ', 'サルビンオオニオイガメ', 'ジャイアントマスクタートル', 'カブトニオイガメ', 'オオアタマヒメニオイガメ', 'スジクビヒメニオイガメ', 'ミシシッピニオイガメ', 'オオアタマヘビクビガメ', 'トゲモモヘビクビガメ', 'ブチハラヘビクビガメ', 'クロハラヘビクビガメ', 'カンナガクビガメ', 'グナレンナガクビガメ', 'オーストラリアナガクビガメ', 'マッコードナガクビガメ', 'チモールナガクビガメ', 'ニューギニアナガクビガメ', 'コウホソナガクビガメ', 'ライマンナガクビガメ', 'ジーベンロックナガクビガメ', 'マタマタ', 'ブランデルカブトガメ', 'シロガオカブトガメ', 'ニューギニアカブトガメ', 'サウスイリアンカブトガメ', 'シュルツカブトガメ', 'キンバリーアカミミマゲクビガメ', 'クレフトマゲクビガメ', 'ニシキマゲクビガメ', 'ブラジルヘビクビガメ', 'ギザミネヘビクビガメ', 'エキスパンサーナガクビガメ', 'パーケリーナガクビガメ', 'ジェフロアカエルガメ', 'キタジェフロアカエルガメ', 'ミナミジェフロアカエルガメ', 'ヒメカエルガメ', 'ヒラリーカエルガメ', 'ナスタカエルガメ', 'アマゾンカエルガメ', 'コシヒロカエルガメ', 'へーゲカエルガメ', 'セグロヒラタヘビクビガメ', 'ズアカヒラタヘビクビガメ', 'マダガスカルヨコクビガメ', 'アフリカヌマヨコクビガメ', 'オオアタマヨコクビガメ', 'アダンソンハコヨコクビガメ', 'オカバンゴハコヨコクビガメ', 'トゥルカナハコヨコクビガメ', 'クリイロハコヨコクビガメ', 'シロガオハコヨコクビガメ', 'ヒメハコヨコクビガメ', 'コガネハコヨコクビガメ', 'ノコヘリハコヨコクビガメ', 'アフリカウスグロハコヨコクビガメ', 'ウペンバハコヨコクビガメ', 'オオヨコクビガメ', 'カイエンズアカヨコクビガメ', 'ムツコブヨコクビガメ', 'モンキヨコクビガメ', 'サバンナヨコクビガメ', 'ブチイシガメ', 'セスジニシキガメ', 'キボシイシガメ', 'フロリダチキンタートル', 'ブランディングタートル', 'サルディーニャヌマガメ', 'キボシヌマガメ', 'モリイシガメ', 'バーバーチズガメ', 'ケイグルチズガメ', 'キマダラチズガメ', 'ヒラチズガメ', 'ギボンチズガメ', 'デルタクロコブチズガメ', 'キタクロコブチズガメ', 'ワモンチズガメ', 'フトマユチズガメ', 'ニセチズガメ', 'ハイイロチズガメ', 'アラバマチズガメ', 'テキサスチズガメ', 'カロリナダイヤモンドバックテラピン', 'テキサスダイヤモンドバックテラピン', 'オルナータダイヤモンドバックテラピン', 'ミシシッピダイヤモンドバックテラピン', 'マングローブダイヤモンドバックテラピン', 'フロリダダイヤモンドバックテラピン', 'ノーザンダイヤモンドバックテラピン', 'アラバマアカハラガメ', 'リバークーター', 'リオグランデクーター', 'フロリダアカハラガメ', 'フロリダハコガメ', 'トウブハコガメ', 'ガルフコーストハコガメ', 'メキシコハコガメ', 'ミツユビハコガメ', 'ユカタンハコガメ', 'ミナミニシキハコガメ', 'キタニシキハコガメ', 'コロンビアクジャクガメ', 'キューバスライダー', 'アルゼンチンクジャクガメ', 'ミシシッピアカミミガメ', 'キバラガメ', 'カンバーランドキミミガメ', 'タバスコクジャクガメ', 'カラグールガメ', 'オオセタカガメ', 'ニシキセタカガメ', 'アンボイナハコガメ', 'ジャワハコガメ', 'シャムハコガメ', 'ビルマハコガメ', 'タイワンセマルハコガメ', 'チュウゴクセマルハコガメ', 'ラオスモエギハコガメ', 'クロハラモエギハコガメ', 'マッコードハコガメ', 'モンホットハコガメ', 'ムオヒラセガメ', 'オプストヒラセガメ', 'ミスジハコガメ', 'ノコヘリマルガメ', 'ミナミクロハラマルガメ', 'インドクロハラマルガメ', 'オルダムマルガメ', 'スジクビマルガメ', 'スペングラーヤマガメ', 'シロアゴヤマガメ', 'インダスカンムリガメ', 'ヒジリガメ', 'オオヤマガメ', 'トゲヤマガメ', 'マレーニシクイガメ', 'アンナンガメ', 'カスピイシガメ', 'ニホンイシガメ', 'スペインイシガメ', 'モロッコイシガメ', 'サハライシガメ', 'ヤエヤマミナミイシガメ', 'ミナミイシガメ', 'カントンクサガメ', 'クサガメ', 'ウンキュウ', 'ギリシャイシガメ', 'ハナガメ', 'トラバンコアヤマガメ', 'セイロンヤマガメ', 'ピーターズメダマガメ', 'ムツイタガメ', 'ボルネオカワガメ', 'シロアシセタカガメ', 'アッサムセタカガメ', 'ベニマワリセタカガメ', 'キバラセタカガメ', 'グァテマラアカスジヤマガメ', 'コスタリカアカスジヤマガメ', 'メキシコアカスジヤマガメ', 'ジャノメイシガメ', 'ヨツメイシガメ', 'ホオジロクロガメ', 'レイテヤマガメ', 'チュウゴクオオアタマガメ', 'ビルマオオアタマガメ', 'シウイオオアタマガメ', 'ボーグリーオオアタマガメ', 'ワニガメ', 'インドシナオオスッポン', 'フロリダスッポン', 'カンチャナブリコガシラスッポン', 'インドコガシラスッポン', 'ヒラタスッポン', 'キタインドハコスッポン', 'ミナミインドハコスッポン', 'ビルマハコスッポン', 'ハナマルスッポン', 'カントールマルスッポン', 'ゴマダラマルスッポン', 'シナスッポン', 'ナイルスッポン', 'スッポンモドキ', 'メキシコカワガメ', 'その他'];
      var geckos = ['マレーシアキャットゲッコー', 'ボルネオキャットゲッコー', 'ボウシトカゲモドキ', 'オバケトカゲモドキ', 'ヒョウモントカゲモドキ', 'アシナガトカゲモドキ', 'バワンリントカゲモドキ', 'ハイナントカゲモドキ', 'ゴマバラトカゲモドキ', 'ニシアフリカトカゲモドキ', 'ヒガシアフリカトカゲモドキ', 'ボイヴィンネコツメヤモリ', 'グローブヤモリ', 'ナミブグローブヤモリ', 'イトコホソユビヤモリ', 'エロークホソユビヤモリ', 'ジャワホソユビヤモリ', 'マレーホソユビヤモリ', 'ヨスジホソユビヤモリ', 'トゲオボウユビヤモリ', 'オオバクチヤモリ', 'ハルマヘラジャイアントゲッコー', 'トッケイヤモリ', 'マーブルゲッコー', 'ニホンヤモリ', 'ゴールデンゲッコー', 'ホワイトラインゲッコー', 'キバラナキヤモリ', 'アリヅカナキヤモリ', 'ヒガシアフリカネコツメヤモリ', 'キガシラマルメヤモリ', 'ブルーゲッコー', 'サラマンダーゲッコー', 'ビブロンゲッコー', 'ミズカキヤモリ', 'バスタールササクレヤモリ', 'マソベササクレヤモリ', 'ソメワケササクレヤモリ', 'シュトゥンプフササクレヤモリ', 'ヒロオヒルヤモリ', 'ヘリスジヒルヤモリ', 'ベーメオオヒルヤモリ', 'グランディスヒルヤモリ', 'ヨツメヒルヤモリ', 'スタンディングヒルヤモリ', 'パラシュートゲッコー', 'ペトリボウユビヤモリ', 'エレガンスボウユビヤモリ', 'マツカサヤモリ', 'ヤマビタイヘラオヤモリ', 'ノシボラハヘラオヤモリ', 'オニタマオヤモリ', 'デレアニタマオヤモリ', 'ナメハダタマオヤモリ', 'ピルバラナメハダタマオヤモリ', 'オビタマオヤモリ', 'リングテールリーフゲッコー', 'アンダーウッディサウルス', 'ゴマフウチワヤモリ', 'ヘルメットゲッコー', 'クラカケカベヤモリ', 'セントマーチンカブラオヤモリ', 'キガシライロワケヤモリ', 'カータートゲオヤモリ', 'プシバルスキースキンクヤモリ', 'ロボロフスキースキンクヤモリ', 'ババイヤゲイタイナ', 'クレステッドゲッコー', 'サラシノミカドヤモリ', 'ガレアータスイシヤモリ', 'セスジイシヤモリ', 'アグリコラクチサケヤモリ', 'アカジタミドリヤモリ', 'チャホアミカドヤモリ', 'ハスオビビロードヤモリ', 'オセラータビロードヤモリ', 'ガーゴイルゲッコー', 'ニューカレドニアジャイアントゲッコー（ヘンケリ）', 'ニューカレドニアジャイアントゲッコー（グランテラ）', 'コモチミカドヤモリ', 'マツゲイシヤモリ', 'ヤワトゲイシヤモリ', 'ジカリーヒレアシトカゲ', 'その他'];
      var chameleons = ['ショートホーンカメレオン', 'マルテカメレオン', 'クリストファーパーソンカメレオン', 'パーソンカメレオン', 'ツーストライプカメレオン', 'エボシカメレオン', 'デレマカメレオン', 'ディレピスカメレオン', 'ヘルメットカメレオン', 'ジャクソンカメレオン', 'メルモンタヌスジャクソンカメレオン', 'キサントロプスジャクソンカメレオン', 'メラーカメレオン', 'ヤマカメレオン', 'ルディスカメレオン', 'セネガルカメレオン', 'ワーナーカメレオン', 'カーペットカメレオン', 'ウスタレカメレオン', 'パンサーカメレオン', 'スパイニーカメレオン', 'ウィルズカメレオン', 'トランスバールドワーフカメレオン', 'フィッシャーカメレオン', 'ヒゲコノハカメレオン', 'ソマリコノハカメレオン', 'デカリーヒメカメレオン', 'その他'];
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

// Pet information edit
document.addEventListener("turbo:load", function() {
  var avatarPreview = document.getElementById('avatar-preview');
  var fileInput = document.getElementById('pet_avatar');

  if (avatarPreview && fileInput) {
    // When the avatar preview is clicked, trigger the file input
    avatarPreview.addEventListener('click', function() {
      fileInput.click();
    });

    // Function to update the avatar preview
    function updateAvatarPreview(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
          document.getElementById('avatar-preview').src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    }

    // Set the onchange event to update the preview
    fileInput.onchange = function() {
      updateAvatarPreview(this);
    };
  }

  var roleSelect = document.getElementById('pet_category');

  if (roleSelect) {
    roleSelect.addEventListener('change', function() {
      var selectedCategory = this.value;
      var snakes=['オリーブアレチヘビ', 'サビイロクチバシヘビ', 'モイラヘビ', 'モンペリエヘビ', 'アフリカンハウススネーク', 'ブラックハウススネーク', 'タカチホヘビ', 'ドラゴンスネーク', 'ガボンアダー', 'ツノスナクサリヘビ', 'パフアダー', 'ヨーロッパクサリヘビ', 'ラッセルクサリヘビ', 'アメリカヒメガラガラ', 'カパーヘッド', 'ニホンマムシ', 'ヌママムシ', 'ハブ', 'ブッシュマスター', 'マツゲハブ', 'ヨロイハブ', 'インドコブラ', 'エジプトコブラ', 'キングコブラ', 'ケープコブラ', 'ブラックマンバ', 'モノクルコブラ', 'リンカルス', 'サンゴパイプヘビ', 'サンビームヘビ', 'オオアオムチヘビ', 'ゴールデントビヘビ', 'ニシキブロンズヘビ', 'ハナナガムチヘビ', 'アオダイショウ', 'アカマダラ', 'アフリカタマゴヘビ', 'アムールラットスネーク', 'アリゾナマウンテンキングスネーク', 'イースタンインディゴスネーク', 'イエローテールクリボー', 'ウェスタンラットスネーク', 'エモリーラットスネーク', 'オオカサントウ', 'オグロクリボー', 'カリフォルニアキングスネーク', 'カワリシノビヘビ', 'ガンスタマゴヘビ', 'グァテマラミルクスネーク', 'クチベニヘビ', 'グレーバンドキングスネーク', 'ケープゴファースネーク', 'コーンスネーク', 'ゴファースネーク', 'コモンキングヘビ', 'サラサナメラ', 'サンルイスポトシキングヘビ', 'シナククリィヘビ', 'シマヘビ', 'ジムグリ', 'ジャンセンラットスネーク', 'シュウダ', 'シロマダラ', 'スジメアオナメラ', 'スペックルドキングスネーク', 'タイガーラットスネーク', 'タイワンアオヘビ', 'タカサゴナメラ', 'トランスペコスラットスネーク', 'ナンダ', 'パインヘビ', 'ヒメナンダ', 'ヒョウモンナメラ', 'ブームスラング', 'プレーリーキングスネーク', 'ベアードラットスネーク', 'ベニナメラ', 'ホウシャナメラ', 'ホソツラナメラ', 'マングローブヘビ', 'ミナミオオガシラ', 'ミルクヘビ', 'メキシカンミルクスネーク', 'ライノラットスネーク', 'ラオスオオカミヘビ', 'ルスベンキングスネーク', 'キタネコメヘビ', 'クビワヘビ', 'セイブシシバナヘビ', 'トリカラーホグノーズ', 'ナンブシシバナヘビ', 'バロンコダマヘビ', 'ミズコブラモドキ', 'ムスラナ', 'メキシコシシバナヘビ', 'クロスジソウカダ', 'サンタクルズガータースネーク', 'チェッカーガータースネーク', 'トウブガータースネーク', 'プレーンズガータースネーク', 'ヤマカガシ', 'アカオパイプヘビ', 'セイロンパイプヘビ', 'ゴノメアリノハハヘビ', 'テングキノボリヘビ', 'マダガスカルオオブタバナヘビ', 'オオウロコミジカオ', 'カイレクロミジカオ', 'オオミズヘビ', 'キールウミワタリ', 'ヒゲミズヘビ', 'ヒロクチミズヘビ', 'モグラヘビ', 'アラフラヤスリヘビ', 'ジャワヤスリヘビ', 'ヒメヤスリヘビ', 'キールヒメボア', 'キタトラキボア', 'アフリカニシキヘビ', 'アミメニシキヘビ', 'アメジストパイソン', 'アルバーティスパイソン', 'アンゴラパイソン', 'アントヒルパイソン', 'インドニシキヘビ', 'ウォマパイソン', 'オエンペリニシキヘビ', 'オーストラリアヤブニシキヘビ', 'オリーブパイソン', 'カーペットパイソン', 'グリーンパイソン', 'スポッテッドパイソン', 'スマトラブラッドパイソン', 'セントラルカーペットパイソン', 'チモールパイソン', 'チルドレンパイソン', 'ナタールニシキヘビ', 'パプアンパイソン', 'ハルマヘラパイソン', 'ビルマニシキヘビ', 'ブラウンウォーターパイソン', 'ブラックヘッドパイソン', 'ベーレンパイソン', 'ボールパイソン', 'ボルネオブラッドパイソン', 'マクロットパイソン', 'マラヤンブラッドパイソン', 'モエギニシキヘビ', 'モルカンパイソン', 'ラフスケールパイソン', 'リングパイソン', 'カラバリア', 'ケニアサンドボア', 'ジョニーサンドボア', 'タタールサンドボア', 'ナイルスナボア', 'ニシガーツスナボア', 'ホシニラミスナボア', 'ヤハズスナボア', 'ラフスナボア', 'バイパーボア', 'パシフィックグランドボア', 'パシフィックツリーボア', 'ビブロンボア', 'パナマヒラタボア', 'アマゾンツリーボア', 'アルゼンチンレインボーボア', 'エメラルドツリーボア', 'オオアナコンダ', 'キイロアナコンダ', 'キューバボア', 'コロンビアレインボーボア', 'ジャマイカボア', 'チュウベイツリーボア', 'チュウベイボア', 'ハイチボア', 'プエルトリコボア', 'ブラジルレインボーボア', 'ボアコンストリクター', 'リングツリーボア', 'サンジニアボア', 'セイブサンジニアボア', 'デュメリルボア', 'マダガスカルボア', 'ラバーボア', 'ロージーボア', 'その他'];
      var lizards =['リッジテールモニター', 'アフリカンロックモニター（ノドジロ）', 'アフリカンロックモニター（ノドグロ）', 'ピーコックモニター', 'ブラックツリーモニター', 'ショートテールモニター', 'セラムモニター', 'ブルーテールモニター', 'デュメリルモニター', 'サバンナモニター', 'フィンスクモニター', 'ピグミーマルガモニター', 'キンバリーロックモニター', 'グールドモニター', 'マングローブモニター', 'カールシュミットモニター', 'キングヒメオオトカゲ ', 'コルデンシスモニター', 'コバルトモニター', 'イエローヘッドモニター', 'メルテンスモニター', 'ナイルモニター', 'オルナータナイルモニター', 'トーチモニター', 'グレイモニター', 'ピルバラロックモニター', 'ワイゲオツリーモニター', 'ローゼンバーグモニター', 'エメラルドツリーモニター', 'ラフネックモニター', 'サルバトールモニター（ジャワ産）', 'カミンギーモニター', 'コマイニーモニター', 'マルモラータモニター', 'ホワイトヘッドモニター', 'サルバトールモニター', 'トギアンウォーターモニター', 'サンギールモニター', 'サルファモニター', 'サルバトールモニター（オビ島産）', 'シミリスモニター', 'イザベルモニター', 'ストーリーモニター', 'チモールモニター', 'フレックルモニター', 'レースモニター', 'トリカラーモニター', 'キサモニター', 'ボルネオミミナシオオトカゲ', 'フトヒゲカメレオンモドキ', 'ポルカスカメレオンモドキ', 'グリーンバシリスク', 'ミツメイグアナ', 'クビワトカゲ', 'サバククビワトカゲ', 'クラークトゲオイグアナ', 'ユカタントゲオイグアナ', 'サンエステバントゲオイグアナ', 'アグアントゲオイグアナ', 'バナナスパイニーテールイグアナ', 'スベノドトゲオイグアナ', 'ツナギトゲオイグアナ', 'グアテマラスパイニーテールイグアナ', 'ヒョウトカゲ', 'レッサーアンティルイグアナ', 'グリーンイグアナ', 'サバブラックイグアナ', 'セントルシアバンデッドイグアナ', 'キュビエブキオトカゲ', 'ハグルマブキオトカゲ', 'バハブルーロックリザード', 'ノギハラハガクレトカゲ', 'キタチャクワラ', 'エンジェルアイランドチャクワラ', 'メキシコアオハリトカゲ', 'マラカイトハリトカゲ', 'ウラノスコドン', 'ヨウガントカゲ', 'ゼブラテールリザード', 'ジャイアントホーンドリザード', 'ブラコルニエリツノトカゲ', 'テキサスツノトカゲ', 'メキシコツノトカゲ', 'キタサバクツノトカゲ', 'リーガルツノトカゲ', 'マサイヨロイトカゲ', 'アルマジロトカゲ', 'ジョーンズヨロイトカゲ', 'トロピクスヨロイトカゲ', 'エンペラーフラットロックリザード', 'バーベントンワーレンヨロイトカゲ', 'ディプレッサワーレンヨロイトカゲ', 'オオヨロイトカゲ', 'オレンジサイドワーレンヨロイトカゲ', 'グリーンアミーバ', 'リボンハシリトカゲ', 'ムスジハシリトカゲ', 'アルゼンチンブラックアンドホワイトテグー', 'レッドテグー', 'ゴールデンテグー', 'ギアナカイマントカゲ', 'ボスカヘリユビカナヘビ', 'アミメヘリユビカナヘビ', 'トラフソウゲンカナヘビ', 'アイセントラウトカナリアカナヘビ', 'ニシカナリアカナヘビ', 'ジャイアントガロティア', 'ミドリガストロカナヘビ', 'アーガスニワカナヘビ', 'オオミドリカナヘビ', 'ボカージュカベカナヘビ', 'イベリアカベカナヘビ', 'ムラリスカベカナヘビ', 'シクラカベカナヘビ', 'オナガカナヘビ', 'ニホンカナヘビ', 'ホウセキカナヘビ', 'ネバダホウセキカナヘビ', 'ベトナムクシトカゲ', 'ナタリアクシトカゲ', 'レインボーアガマ', 'ユバトカロテス', 'バカエカロテス', 'シロクチカロテス', 'エリマキトカゲ', 'ミヤビキノボリトカゲ', 'ジャワトビトカゲ', 'ベルモリドラゴン', 'カメレオンモリドラゴン', 'ドリアエモリドラゴン', 'アンボイナホカケトカゲ', 'セレベスホカケトカゲ', 'フィリピンホカケトカゲ', 'ハルマヘラホカケトカゲ', 'ソロモンジャイアントミナミモリドラゴン', 'マクロレピスミナミモリドラゴン', 'ノドグロミナミモリドラゴン', 'レッドタイガーバタフライアガマ', 'レイオレピス・ゴーヴァントリイ', 'リーブスバタフライアガマ', 'ディロフスモリドラゴン', 'インドシナウォータードラゴン', 'ヒガシウォータードラゴン', 'オオクチガマトカゲ', 'プシバルスキーカエルアタマアガマ', 'アカツキガマトカゲ', 'ローソンアゴヒゲトカゲ', 'フトアゴヒゲトカゲ', 'イロヌリアガマ', 'ホオスジドラゴン', 'アカンシニュルストゲオアガマ', 'モロッコトゲオアガマ', 'エジプトトゲオアガマ', 'コウロコトゲオアガマ', 'ディスパートゲオアガマ', 'オビトゲオアガマ', 'マリトゲオアガマ', 'ゲイリートゲオアガマ', 'ハードウィッキートゲオアガマ', 'ソマリアトゲオアガマ', 'クジャクトゲオアガマ', 'ニシキトゲオアガマ', 'フィルビートゲオアガマ', 'プリンケプストゲオアガマ', 'トーマストゲオアガマ', 'ゼノガマ', 'サバンナダーツスキンク', 'アストロジャイアントダイビングスキンク', 'アミメミズベトカゲ', 'ミスジアンドロンゴサウルス', 'フレーリーイワトカゲ', 'オオアシカラカネトカゲ', 'オマキトカゲ', 'カニンガムイワトカゲ', 'デプレッサイワトカゲ', 'ホズマーイワトカゲ', 'ストケスイワトカゲ', 'ブラックエモイア', 'クマドリカラタケトカゲ', 'アルジェリアスキンク', 'シュナイダースキンク', 'モモジタトカゲ', 'クロスジエンピツトカゲ', 'ミドリツヤトカゲ', 'ラブリッジクロアシナシスキンク', 'フェルナンデススキンク', 'ニホントカゲ', 'ブラコニエルヒレアシスキンク', 'ピーターズバンデッドスキンク', 'イエメンジャイアントサンドフィッシュ', 'ミトラサンドフィッシュ', 'サンドフィッシュ', 'オマーンサンドフィッシュスキンク', 'ミューラースキンク', 'インドネシアアオジタトカゲ', 'ハルマヘラアオジタトカゲ', 'ケイアオジタトカゲ', 'チュウオウアオジタトカゲ', 'マダラアオジタトカゲ', 'ニシアオジタトカゲ', 'ヒガシマツカサトカゲ', 'ロットネスマツカサトカゲ', 'シャークベイマツカサトカゲ', 'ニシマツカサトカゲ', 'キメラアオジタトカゲ', 'キタアオジタトカゲ', 'ヒガシアオジタトカゲ', 'ゼブラスキンク', 'イツスジマブヤ', 'アカメカブトトカゲ', 'モトイカブトトカゲ', 'スラウェシクロコダイルスキンク', 'シナミズトカゲ', 'ニシオニプレートトカゲ', 'ヒガシオニプレートトカゲ', 'ツェッヒオニプレートトカゲ', 'ニシキカタトカゲ', 'カーステンオビトカゲ', 'ヒラオオビトカゲ', 'カムロオビトカゲ', 'マキシムキングゾノザウルス', 'カザリオビトカゲ', 'ヨスジオビトカゲ', 'シナワニトカゲ', 'メキシココブトカゲ', 'イボヨルトカゲ', 'スミスヨルトカゲ', 'ダンダラミミズトカゲ', 'バルカンミミズトカゲ', 'ヨツユビアホロテトカゲ', 'アラビアミミズトカゲ', 'コモチミミズトカゲ', 'オカアリゲーターリザード', 'ヨーロッパアシナシトカゲ', 'トラキアアシナシトカゲ', 'ハーティアシナシトカゲ', 'その他'];
      var turtles = ['アルダブラゾウガメ', 'ホウシャガメ', 'ケヅメリクガメ', 'ケヅメヒョウモンリクガメ', 'アカアシリクガメ', 'チャコリクガメ', 'キアシリクガメ', 'ソリガメ', 'インドホシガメ', 'セイロンホシガメ', 'ビルマホシガメ', 'テキサスゴファーガメ', 'アナホリゴファーガメ', 'オウムヒラセリクガメ', 'シモフリヒラセリクガメ', 'エロンガータリクガメ', 'セレベスリクガメ', 'ニシベルセオレガメ', 'ホームセオレガメ', 'スピークセオレガメ', 'パンケーキリクガメ', 'スマトラムツアシガメ', 'ビルマムツアシガメ', 'インプレッサムツアシガメ', 'ノコヘリヤブガメ', 'キバラクモノスガメ', 'キタクモノスガメ', 'ミナミクモノスガメ', 'ヒラオリクガメ', 'ヒョウモンリクガメ', 'ナミビアヒョウモンリクガメ', 'ソマリアヒョウモンガメ', 'キレーネリクガメ', 'イベラギリシャリクガメ', 'モロッコギリシャリクガメ', 'スースーギリシャリクガメ', 'イーストアナトリアンジャイアント', 'アラブギリシャリクガメ', 'ヒガシヘルマンリクガメ', 'ニシヘルマンリクガメ', 'アフガンホルスフィールドリクガメ', 'オオフチゾリリクガメ', 'ペロポネソスフチゾリリクガメ', 'ロシアリクガメ', 'ハラガケガメ', 'ハナナガドロガメ', 'アラモスドロガメ', 'ミスジドロガメ', 'ホオアカドロガメ', 'キイロドロガメ', 'ハーレラドロガメ', 'ゴツアシドロガメ', 'チャパラドロガメ', 'シロクチドロガメ', 'キタシロクチドロガメ', 'コガネドロガメ', 'ノドジロドロガメ', 'フロリダドロガメ', 'トウブドロガメ', 'ペンシルバニアドロガメ', 'サルビンオオニオイガメ', 'ジャイアントマスクタートル', 'カブトニオイガメ', 'オオアタマヒメニオイガメ', 'スジクビヒメニオイガメ', 'ミシシッピニオイガメ', 'オオアタマヘビクビガメ', 'トゲモモヘビクビガメ', 'ブチハラヘビクビガメ', 'クロハラヘビクビガメ', 'カンナガクビガメ', 'グナレンナガクビガメ', 'オーストラリアナガクビガメ', 'マッコードナガクビガメ', 'チモールナガクビガメ', 'ニューギニアナガクビガメ', 'コウホソナガクビガメ', 'ライマンナガクビガメ', 'ジーベンロックナガクビガメ', 'マタマタ', 'ブランデルカブトガメ', 'シロガオカブトガメ', 'ニューギニアカブトガメ', 'サウスイリアンカブトガメ', 'シュルツカブトガメ', 'キンバリーアカミミマゲクビガメ', 'クレフトマゲクビガメ', 'ニシキマゲクビガメ', 'ブラジルヘビクビガメ', 'ギザミネヘビクビガメ', 'エキスパンサーナガクビガメ', 'パーケリーナガクビガメ', 'ジェフロアカエルガメ', 'キタジェフロアカエルガメ', 'ミナミジェフロアカエルガメ', 'ヒメカエルガメ', 'ヒラリーカエルガメ', 'ナスタカエルガメ', 'アマゾンカエルガメ', 'コシヒロカエルガメ', 'へーゲカエルガメ', 'セグロヒラタヘビクビガメ', 'ズアカヒラタヘビクビガメ', 'マダガスカルヨコクビガメ', 'アフリカヌマヨコクビガメ', 'オオアタマヨコクビガメ', 'アダンソンハコヨコクビガメ', 'オカバンゴハコヨコクビガメ', 'トゥルカナハコヨコクビガメ', 'クリイロハコヨコクビガメ', 'シロガオハコヨコクビガメ', 'ヒメハコヨコクビガメ', 'コガネハコヨコクビガメ', 'ノコヘリハコヨコクビガメ', 'アフリカウスグロハコヨコクビガメ', 'ウペンバハコヨコクビガメ', 'オオヨコクビガメ', 'カイエンズアカヨコクビガメ', 'ムツコブヨコクビガメ', 'モンキヨコクビガメ', 'サバンナヨコクビガメ', 'ブチイシガメ', 'セスジニシキガメ', 'キボシイシガメ', 'フロリダチキンタートル', 'ブランディングタートル', 'サルディーニャヌマガメ', 'キボシヌマガメ', 'モリイシガメ', 'バーバーチズガメ', 'ケイグルチズガメ', 'キマダラチズガメ', 'ヒラチズガメ', 'ギボンチズガメ', 'デルタクロコブチズガメ', 'キタクロコブチズガメ', 'ワモンチズガメ', 'フトマユチズガメ', 'ニセチズガメ', 'ハイイロチズガメ', 'アラバマチズガメ', 'テキサスチズガメ', 'カロリナダイヤモンドバックテラピン', 'テキサスダイヤモンドバックテラピン', 'オルナータダイヤモンドバックテラピン', 'ミシシッピダイヤモンドバックテラピン', 'マングローブダイヤモンドバックテラピン', 'フロリダダイヤモンドバックテラピン', 'ノーザンダイヤモンドバックテラピン', 'アラバマアカハラガメ', 'リバークーター', 'リオグランデクーター', 'フロリダアカハラガメ', 'フロリダハコガメ', 'トウブハコガメ', 'ガルフコーストハコガメ', 'メキシコハコガメ', 'ミツユビハコガメ', 'ユカタンハコガメ', 'ミナミニシキハコガメ', 'キタニシキハコガメ', 'コロンビアクジャクガメ', 'キューバスライダー', 'アルゼンチンクジャクガメ', 'ミシシッピアカミミガメ', 'キバラガメ', 'カンバーランドキミミガメ', 'タバスコクジャクガメ', 'カラグールガメ', 'オオセタカガメ', 'ニシキセタカガメ', 'アンボイナハコガメ', 'ジャワハコガメ', 'シャムハコガメ', 'ビルマハコガメ', 'タイワンセマルハコガメ', 'チュウゴクセマルハコガメ', 'ラオスモエギハコガメ', 'クロハラモエギハコガメ', 'マッコードハコガメ', 'モンホットハコガメ', 'ムオヒラセガメ', 'オプストヒラセガメ', 'ミスジハコガメ', 'ノコヘリマルガメ', 'ミナミクロハラマルガメ', 'インドクロハラマルガメ', 'オルダムマルガメ', 'スジクビマルガメ', 'スペングラーヤマガメ', 'シロアゴヤマガメ', 'インダスカンムリガメ', 'ヒジリガメ', 'オオヤマガメ', 'トゲヤマガメ', 'マレーニシクイガメ', 'アンナンガメ', 'カスピイシガメ', 'ニホンイシガメ', 'スペインイシガメ', 'モロッコイシガメ', 'サハライシガメ', 'ヤエヤマミナミイシガメ', 'ミナミイシガメ', 'カントンクサガメ', 'クサガメ', 'ウンキュウ', 'ギリシャイシガメ', 'ハナガメ', 'トラバンコアヤマガメ', 'セイロンヤマガメ', 'ピーターズメダマガメ', 'ムツイタガメ', 'ボルネオカワガメ', 'シロアシセタカガメ', 'アッサムセタカガメ', 'ベニマワリセタカガメ', 'キバラセタカガメ', 'グァテマラアカスジヤマガメ', 'コスタリカアカスジヤマガメ', 'メキシコアカスジヤマガメ', 'ジャノメイシガメ', 'ヨツメイシガメ', 'ホオジロクロガメ', 'レイテヤマガメ', 'チュウゴクオオアタマガメ', 'ビルマオオアタマガメ', 'シウイオオアタマガメ', 'ボーグリーオオアタマガメ', 'ワニガメ', 'インドシナオオスッポン', 'フロリダスッポン', 'カンチャナブリコガシラスッポン', 'インドコガシラスッポン', 'ヒラタスッポン', 'キタインドハコスッポン', 'ミナミインドハコスッポン', 'ビルマハコスッポン', 'ハナマルスッポン', 'カントールマルスッポン', 'ゴマダラマルスッポン', 'シナスッポン', 'ナイルスッポン', 'スッポンモドキ', 'メキシコカワガメ', 'その他'];
      var geckos = ['マレーシアキャットゲッコー', 'ボルネオキャットゲッコー', 'ボウシトカゲモドキ', 'オバケトカゲモドキ', 'ヒョウモントカゲモドキ', 'アシナガトカゲモドキ', 'バワンリントカゲモドキ', 'ハイナントカゲモドキ', 'ゴマバラトカゲモドキ', 'ニシアフリカトカゲモドキ', 'ヒガシアフリカトカゲモドキ', 'ボイヴィンネコツメヤモリ', 'グローブヤモリ', 'ナミブグローブヤモリ', 'イトコホソユビヤモリ', 'エロークホソユビヤモリ', 'ジャワホソユビヤモリ', 'マレーホソユビヤモリ', 'ヨスジホソユビヤモリ', 'トゲオボウユビヤモリ', 'オオバクチヤモリ', 'ハルマヘラジャイアントゲッコー', 'トッケイヤモリ', 'マーブルゲッコー', 'ニホンヤモリ', 'ゴールデンゲッコー', 'ホワイトラインゲッコー', 'キバラナキヤモリ', 'アリヅカナキヤモリ', 'ヒガシアフリカネコツメヤモリ', 'キガシラマルメヤモリ', 'ブルーゲッコー', 'サラマンダーゲッコー', 'ビブロンゲッコー', 'ミズカキヤモリ', 'バスタールササクレヤモリ', 'マソベササクレヤモリ', 'ソメワケササクレヤモリ', 'シュトゥンプフササクレヤモリ', 'ヒロオヒルヤモリ', 'ヘリスジヒルヤモリ', 'ベーメオオヒルヤモリ', 'グランディスヒルヤモリ', 'ヨツメヒルヤモリ', 'スタンディングヒルヤモリ', 'パラシュートゲッコー', 'ペトリボウユビヤモリ', 'エレガンスボウユビヤモリ', 'マツカサヤモリ', 'ヤマビタイヘラオヤモリ', 'ノシボラハヘラオヤモリ', 'オニタマオヤモリ', 'デレアニタマオヤモリ', 'ナメハダタマオヤモリ', 'ピルバラナメハダタマオヤモリ', 'オビタマオヤモリ', 'リングテールリーフゲッコー', 'アンダーウッディサウルス', 'ゴマフウチワヤモリ', 'ヘルメットゲッコー', 'クラカケカベヤモリ', 'セントマーチンカブラオヤモリ', 'キガシライロワケヤモリ', 'カータートゲオヤモリ', 'プシバルスキースキンクヤモリ', 'ロボロフスキースキンクヤモリ', 'ババイヤゲイタイナ', 'クレステッドゲッコー', 'サラシノミカドヤモリ', 'ガレアータスイシヤモリ', 'セスジイシヤモリ', 'アグリコラクチサケヤモリ', 'アカジタミドリヤモリ', 'チャホアミカドヤモリ', 'ハスオビビロードヤモリ', 'オセラータビロードヤモリ', 'ガーゴイルゲッコー', 'ニューカレドニアジャイアントゲッコー（ヘンケリ）', 'ニューカレドニアジャイアントゲッコー（グランテラ）', 'コモチミカドヤモリ', 'マツゲイシヤモリ', 'ヤワトゲイシヤモリ', 'ジカリーヒレアシトカゲ', 'その他'];
      var chameleons = ['ショートホーンカメレオン', 'マルテカメレオン', 'クリストファーパーソンカメレオン', 'パーソンカメレオン', 'ツーストライプカメレオン', 'エボシカメレオン', 'デレマカメレオン', 'ディレピスカメレオン', 'ヘルメットカメレオン', 'ジャクソンカメレオン', 'メルモンタヌスジャクソンカメレオン', 'キサントロプスジャクソンカメレオン', 'メラーカメレオン', 'ヤマカメレオン', 'ルディスカメレオン', 'セネガルカメレオン', 'ワーナーカメレオン', 'カーペットカメレオン', 'ウスタレカメレオン', 'パンサーカメレオン', 'スパイニーカメレオン', 'ウィルズカメレオン', 'トランスバールドワーフカメレオン', 'フィッシャーカメレオン', 'ヒゲコノハカメレオン', 'ソマリコノハカメレオン', 'デカリーヒメカメレオン', 'その他'];
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

// Event Image upload
document.addEventListener("turbo:load", function() {
  var fileInputs = document.querySelectorAll('.file-input');
  var imagePreviews = document.querySelectorAll('.image-upload');

  fileInputs.forEach((fileInput, index) => {
    var imagePreview = imagePreviews[index];

    imagePreview.addEventListener('click', function() {
      fileInput.click();
    });

    fileInput.addEventListener('change', function() {
      if (fileInput.files && fileInput.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
          imagePreview.src = e.target.result;
        };
        reader.readAsDataURL(fileInput.files[0]);
      }
    });
  });
});


// Event Image upload preview and removal
document.addEventListener("turbo:load", function() {
  var fileInputs = document.querySelectorAll('.file-input');
  var imagePreviews = document.querySelectorAll('.image-upload');
  var eventContainer = document.querySelector('.edit-event-container');

  if (eventContainer) {
    var eventId = eventContainer.getAttribute('data-event-id');
    var petId = eventContainer.getAttribute('data-pet-id');
    console.log('Event container found with ID:', eventId);

    fileInputs.forEach((fileInput, index) => {
      var imagePreview = imagePreviews[index];

      imagePreview.addEventListener('click', function() {
        fileInput.click();
      });

      fileInput.addEventListener('change', function() {
        if (fileInput.files && fileInput.files[0]) {
          var reader = new FileReader();
          reader.onload = function(e) {
            imagePreview.src = e.target.result;
          };
          reader.readAsDataURL(fileInput.files[0]);
        }
      });
    });

    var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    document.querySelectorAll('.remove-icon').forEach((icon, index) => {
      icon.addEventListener('click', function() {
        console.log('Removing image at index:', index);
        fetch(`/pets/${petId}/events/${eventId}/remove_image`, {
          method: 'DELETE',
          headers: {
            'X-CSRF-Token': csrfToken,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ index: index }),
          redirect: 'follow'
        })
        .then(response => response.json())
        .then(data => {
          if (data.status === 'success') {
            imagePreviews[index].src = '/assets/forum_default_image.png';
            fileInputs[index].value = '';
          } else {
            console.error('Failed to remove image');
          }
        });
      });
    });
  } else {
    //console.error('Event container not found');
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

// Question Image upload
document.addEventListener("turbo:load", function() {
  var fileInputs = document.querySelectorAll('.file-input');
  var imagePreviews = document.querySelectorAll('.image-upload');
  var questionContainer = document.querySelector('.new-question-container');

  if (questionContainer) {
    var questionId = questionContainer.getAttribute('data-question-id');
    console.log('Question container found with ID:', questionId);

    fileInputs.forEach((fileInput, index) => {
      var imagePreview = imagePreviews[index];

      imagePreview.addEventListener('click', function() {
        fileInput.click();
      });

      fileInput.addEventListener('change', function() {
        if (fileInput.files && fileInput.files[0]) {
          var reader = new FileReader();
          reader.onload = function(e) {
            imagePreview.src = e.target.result;
          };
          reader.readAsDataURL(fileInput.files[0]);
        }
      });
    });

    var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    document.querySelectorAll('.remove-icon').forEach((icon) => {
      icon.addEventListener('click', function() {
        var index = this.getAttribute('data-index');
        console.log('Removing image at index:', index);
        fetch(`/questions/${questionId}/remove_image?index=${index}`, {
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
            imagePreviews[index].src = '/assets/forum_default_image.png';
            fileInputs[index].value = '';
          } else {
            console.error('Failed to remove image');
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
      });
    });
  } else {
    // console.error('Question container not found');
  }
});

// // Question Image upload preview and removal
// document.addEventListener("turbo:load", function() {
//   var fileInputs = document.querySelectorAll('.file-input');
//   var imagePreviews = document.querySelectorAll('.image-upload');
//   var questionContainer = document.querySelector('.new-question-container');

//   if (questionContainer) {
//     var questionId = questionContainer.getAttribute('data-question-id');
//     console.log('Question container found with ID:', questionId);

//     fileInputs.forEach((fileInput, index) => {
//       var imagePreview = imagePreviews[index];

//       imagePreview.addEventListener('click', function() {
//         fileInput.click();
//       });

//       fileInput.addEventListener('change', function() {
//         if (fileInput.files && fileInput.files[0]) {
//           var reader = new FileReader();
//           reader.onload = function(e) {
//             imagePreview.src = e.target.result;
//           };
//           reader.readAsDataURL(fileInput.files[0]);
//         }
//       });
//     });

//     var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

//     document.querySelectorAll('.remove-icon').forEach((icon) => {
//       icon.addEventListener('click', function() {
//         var index = this.getAttribute('data-index');
//         console.log('Removing image at index:', index);
//         fetch(`/questions/${questionId}/remove_image?index=${index}`, {
//           method: 'DELETE',
//           headers: {
//             'X-CSRF-Token': csrfToken,
//             'Content-Type': 'application/json'
//           },
//           redirect: 'follow'
//         })
//         .then(response => response.json())
//         .then(data => {
//           if (data.status === 'success') {
//             imagePreviews[index].src = '/assets/forum_default_image.png';
//             fileInputs[index].value = '';
//           } else {
//             console.error('Failed to remove image');
//           }
//         });
//       });
//     });
//   } else {
//     // console.error('Question container not found');
//   }
// });

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

// Avatar upload preview
document.addEventListener("turbo:load", function() {
  var avatarPreview = document.getElementById('avatar-preview');
  var fileField = document.getElementById('profile_avatar');

  if (avatarPreview && fileField) {
    avatarPreview.addEventListener('click', function() {
      fileField.click();
    });

    fileField.addEventListener('change', function(event) {
      var reader = new FileReader();
      reader.onload = function(e) {
        avatarPreview.src = e.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    });
  } else {
    console.log('Avatar preview or file field element not found.');
  }
});

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

