<template>
  <div class="container">
    <div class="tinytitle">카테고리 > 상세 </div>
    <div class="maintitle">
      <span>상품명
      <span class="beforebtn">진행전</span>
      <span class="ongoingbtn">진행중</span>
      <span class="finishbtn">종료</span>
      </span> 
    </div>

    <img class="mainimg" src="@/assets/00.jpg">

    
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

  .mainimg {
    width: 510px;
    height: 510px;
  }

  .actionbutton {
      width: 400px;
  }

  .actioncell {
    text-align: center;
  }
</style>
