<template>
  <div class="container">
    <div class="maintitle aligncenter">결제하기</div>
    <div class="middletitle">상품정보</div>
    <div>
      <table>
        <tr>
          <td class="imgcell" rowspan="5">
            <img class="productimg" src="@/assets/00.jpg">
          </td>
          <td>품목명</td>
          <td class="alignright">가격</td>
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

      <hr class="line"/>

      <div class="middletitle">배송정보</div>
      <form @submit.prevent="submitForm">
        <table>
          <tr class="leftwidth">
            <td><label for="name">이름</label></td>
            <td><input type="text" id="name" v-model="form.name" class="form-control inputform" placeholder="이름을 입력해주세요" required></td>
          </tr>
          <!-- <tr>
            <td><label for="email">이메일</label></td>
            <td class="alignright"><input type="email" id="email" v-model="form.email" class="form-control" placeholder="Your Email" required></td>
          </tr> -->
          <tr>
            <td><label for="phone">전화번호</label></td>
            <td><input type="tel" id="phone" v-model="form.phone" class="form-control inputform" placeholder="전화번호를 입력해주세요" required></td>
          </tr>
          <tr>
            <td><label for="address">배송지</label></td>
            <td><input type="text" id="address" v-model="form.address" class="form-control inputform" placeholder="주소를 입력해주세요" required></td>
          </tr>
          <tr>
            <td><label for="message">배송메세지</label></td>
            <td><input type="text" id="message" v-model="form.message" class="form-control inputform" placeholder="메세지를 입력해주세요"></td>
          </tr>
        </table>

        <hr class="line"/>

        <div class="middletitle">결제정보</div>
        <table>
          <tr class="leftwidth">
            <td>상품</td>
            <td class="alignright">{{ totalprice }}원</td>
          </tr>
          <tr>
            <td>배송비</td>
            <td class="alignright">3000원</td>
          </tr>
          <tr>
            <td>최종 결제 금액</td>
            <td class="alignright">{{ totalprice + 3000 }}원</td>
          </tr>
        </table>
        <div class="actioncell">
          <v-btn class="actionbutton" type="button" @click="requestPay">결제하기</v-btn>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaymentPage',
  data() {
    return {
      merchantUid: "order-" + new Date().getTime(),
      totalprice: 1000,
      form: {
        name: '',
        phone: '',
        address: '',
        message: ''
      },
    };
  },

  methods: {
    requestPay() {
      const { merchantUid, totalprice, form } = this;

      window.IMP.init("imp30164472");

      window.IMP.request_pay({
          pg: "html5_inicis",
          pay_method: "card",
          merchant_uid: merchantUid,
          name: "Drop the bid",
          amount: totalprice,
          buyer_email: "redjoun@gmail.com",
          buyer_name: form.name,
          buyer_tel: form.phone,
          buyer_addr: form.address,
      }, function (rsp) {
          if (rsp.success) {
              // 결제 성공 시
              console.log(rsp);
              alert('결제가 완료되었습니다.');
              
              // 결제 성공 후 서버에 결제 완료 여부와 결제 시간 업데이트 요청
              fetch(`/payment`, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                      paidat: new Date().toISOString()
                  })
              })
              .then(response => {
                  if (response.ok) {
                      alert('결제 정보가 성공적으로 업데이트되었습니다.');
                      location.reload();
                  } else {
                      alert('결제 정보 업데이트에 실패했습니다.');
                  }
              })
              .catch(error => {
                  console.error('Error:', error);
                  alert('결제 정보 업데이트 중 오류가 발생했습니다.');
              });

          } else {
              // 결제 실패 시
              console.log(rsp);
              alert('결제에 실패하였습니다. 에러 내용: ' + rsp.error_msg);
          }
      })

    },
  }
}
</script>


<style>
@import '@/assets/style.css';

table {
  width: 100%;
  border-collapse: collapse;
}

tr, td {
  padding: 10px 20px;
  border: none !important;
}

.leftwidth {
  width: 250px;
}

.inputform {
  width: 100%;
  border: 1px #999999 solid;
  border-radius: 10px;
  padding: 10px;
}

.imgcell {
  width: 250px;
  text-align: center;
}

.productimg {
  width: 200px !important;
  height: 200px !important;
}

.actionbutton {
  width: 400px;
}

.actioncell {
  text-align: center;
}
</style>
