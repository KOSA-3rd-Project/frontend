<template>
  <div class="container">
    <div class="maintitle aligncenter">결제하기</div>
    <ProductInfo :price="price" imageSrc="@/assets/00.jpg" />
    <hr class="line"/>
    <ShippingInfoForm :form.sync="form" />
    <hr class="line"/>
    <PaymentInfo :price="price" :shippingFee="shippingFee" :totalprice="totalprice" />
    <div class="actioncell">
      <v-btn class="actionbutton" type="submit" @click="submitForm">결제하기</v-btn>
    </div>
  </div>
</template>

<script>
import ProductInfo from '@/components/payment/ProductInfo.vue';
import ShippingInfoForm from '@/components/payment/ShippingInfoForm.vue';
import PaymentInfo from '@/components/payment/PaymentInfo.vue';

export default {
  name: 'PaymentPage',
  components: {
    ProductInfo,
    ShippingInfoForm,
    PaymentInfo
  },
  data() {
    return {
      merchantUid: "order-" + new Date().getTime(),
      price: 100,
      shippingFee: 300,
      form: {
        name: '',
        phone: '',
        address: '',
        message: ''
      },
    };
  },
  computed: {
    totalprice() {
      return this.price + this.shippingFee;
    }
  },
  methods: {
    submitForm() {
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
      }, (rsp) => {
        if (rsp.success) {
          // 결제 성공 시
          console.log(rsp);
          alert('결제가 완료되었습니다.');

          // Save form data to localStorage
          localStorage.setItem('formData', JSON.stringify(form));

          // Send payment completion request to server
          fetch(`/payment`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              auctionId: 1,
              biddingSuccessId: 1,
              name: form.name,
              phoneNumber: form.phone,
              address: form.address,
              message: form.message,
              // createdAt: new Date().toISOString()
            })
          })
          .then(response => {
            if (response.ok) {
              // Redirect to the status page
              window.location.href = '/auctions/paymentstatus';
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
      });
    }
  }
}
</script>

<style scoped>
@import '@/assets/style.css';

.actionbutton {
  margin: 10px;
  width: 400px;
}

.actioncell {
  text-align: center;
}

.line {
  border: 1px solid #ddd;
}
</style>
