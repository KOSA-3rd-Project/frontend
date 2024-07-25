<template>
  <div class="container">
    <div class="maintitle">결제하기</div>
    <div class="middletitle">상품정보</div>
    <div>
      <table>
        <tr>
            <td class="imgcell" rowspan="5">
              <img class="productimg" src="@/assets/00.jpg">
            </td>
            <td>품목명</td>
            <td>가격</td>
        </tr>
        <tr>
            <td colspan="2">카테고리</td>
        </tr>
        <tr>
            <td colspan="2">&nbsp;</td>
        </tr>
        <tr>
            <td colspan="2">경매진행일자</td>
        </tr>
      </table>

      <hr />

      <div class="middletitle">배송정보</div>
      <form id="myForm">
          <table>
            <tr>
              <td><label for="name">이름</label></td>
              <td><input type="text" id="name" name="name" class="form-control" placeholder="Your Name" required></td>
            </tr>
            <tr>
              <td><label for="email">이메일</label></td>
              <td><input type="email" id="email" name="email" class="form-control" placeholder="Your Email" required></td>
            </tr>
            <tr>
              <td><label for="phone">전화번호</label></td>
              <td><input type="tel" id="phone" name="phone" class="form-control" placeholder="Your phone" required></td>
            </tr>
            <tr>
              <td><label for="address">배송지</label></td>
              <td><input type="text" id="address" name="address" class="form-control" placeholder="Your address" required></td>
            </tr>
            <tr>
              <td><label for="message">배송메세지</label></td>
              <td><textarea id="message" name="message" class="form-control" rows="4" placeholder="Your Message" required></textarea></td>
            </tr>
          </table>

      <hr />

      <div class="middletitle">결제정보</div>
          <table>
            <tr>
              <td>상품</td>
              <td>3000원</td>
            </tr>
            <tr>
              <td>배송비</td>
              <td>3000원</td>
            </tr>
            <tr>
              <td>최종 결제 금액</td>
              <td>6000원</td>
            </tr>
          </table>
      <div class="actioncell">
        <v-btn class="actionbutton" type="submit">결제하기</v-btn>
      </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaymentPage'
}
</script>

<style>
  @import '@/assets/style.css';

  table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
  }

  th, td {
      border: 1px solid #999999;   /* 삭제 예정 */
      padding: 10px 50px;
  }

  .imgcell {
    width: 190px;
    justify-content: center;
    align-items: center;
  }

  .productimg {
      width: 150px;
      height: 150px;
  }

  .actionbutton {
      width: 400px;
  }

  .actioncell {
    text-align: center;
  }
</style>
