<template>
  <div class="container">
    <div class="maintitle aligncenter">상품 등록</div>

      <form @submit="handleRegisterAuction">
        <table>
          <tr class="leftwidth">
            <td>상품<span class="redcolor"> *</span></td>
            <td><input type="text" class="inputform" v-model="newAuction.itemName" required></td>
          </tr>
          <tr>
            <td>카테고리<span class="redcolor"> *</span></td>
            <td>
              <select name="category" class="inputform" v-model="newAuction.categoryId" required> 
                <option value="1">패션</option>
                <option value="2">가전</option>
                <option value="3">스포츠</option>
                <option value="4">수집품</option>
                <option value="5">기타</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>상품 상태<span class="redcolor"> *</span></td>
            <td>
              <select name="auctionProductStatus" class="inputform" v-model="newAuction.auctionProductStatusId" required>
                  <option value="1">중고</option>
                  <option value="2">새상품</option>
                  <option value="3">미개봉</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>상품 위치<span class="redcolor"> *</span></td>
            <td><input type="text" class="inputform" v-model="newAuction.location" required/></td>
          </tr>
          <tr>
            <td>시작 가격<span class="redcolor"> *</span></td>
            <td><input type="number" class="inputform" v-model="newAuction.startPrice" required/></td>
          </tr>
          <tr>
            <td>판매 기간<span class="redcolor"> *</span></td>
            <td>
            <input type="datetime-local" class="inputform" v-model="newAuction.startDate" :min="currentDateTime" @change="validateStartDate" required>
            <input type="datetime-local" class="inputform" v-model="newAuction.dueDate" :min="startDateTime" @change="validateDueDate" required>
            </td>
          </tr>
          <tr>
            <td>설명<span class="redcolor"> *</span></td>
            <td><textarea class="inputform" v-model="newAuction.description" maxlength="3000" required></textarea>
            <span class="tinytitle alignright">{{ newAuction.description.length }} / 3000</span></td>
          </tr>
          <tr>
            <td>사진 등록<span class="redcolor"> *</span></td>
            <td><input type="file" class="inputform" ref="imageFiles" multiple @change="onFileChange" accept="image/*" required>
            <span class="tinytitle">첫번째로 등록한 사진이 대표 사진입니다.</span></td>
          </tr>
          <tr>
            <td>
            </td>
            <td>
              <div v-if="imagePreviews.length">
                <div class="image-preview-container">
                  <div v-for="(image, index) in imagePreviews" :key="index" class="image-preview">
                    <button type="button" class="remove-button" @click="removeImage(index)">X</button>
                    <img :src="image" :alt="'미리보기 ' + (index + 1)" width="100" height="100">
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <center>
                <button type="submit" class="actionbutton" :disabled="isSubmitting">등록하기</button>
              </center>
            </td>
          </tr>
        </table>
      </form>
  </div>
</template>

<script>
import axios from 'axios';

const registerAuction = async (newAuction, images) => {
  const formData = new FormData();
      
  formData.append('newAuction', JSON.stringify(newAuction));

  images.forEach((image) => {
    formData.append('images', image);
  });

  try {
    const res = await axios.post('/auctions', formData, {
      headers: {
            'Content-Type': 'multipart/form-data'
          },
      withCredentials: true,
    });

    if (res.status === 201) {
        return true;
    } else {
      console.log(res.statusText);
      return false;
    }
  } catch(error) {
    console.error('Error:', error);
    return false;
  }
};

export default {
    data(){
        return {
          newAuction:{
            itemName:'',
            categoryId:'',
            auctionProductStatusId:'',
            location:'',
            startPrice: '',
            startDate: '',
            dueDate: '',
            description: '',
          },
          images : [],
          imagePreviews: [], // 이미지 미리보기를 위한 배열 추가
          isSubmitting: false,
        }
    },
    methods:{
      onFileChange(event) {
        const selectedFiles = Array.from(this.$refs.imageFiles.files);

        const totalFiles = this.images.length + selectedFiles.length;

        if (totalFiles > 10) {
          alert('이미지는 최대 10장까지 추가할 수 있습니다.');
          event.target.value = null;
          return;
        }

        this.images = [...this.images, ...selectedFiles];

        selectedFiles.forEach((file)=>{
          this.imagePreviews.push(URL.createObjectURL(file));
        });
        
        event.target.value = null;

        console.log(this.images);
      },
      handleRegisterAuction(e){
        
        e.preventDefault();

        this.isSubmitting = true;

        this.newAuction.startDate = this.convertToUTC(this.newAuction.startDate);
        this.newAuction.dueDate = this.convertToUTC(this.newAuction.dueDate);

        registerAuction(this.newAuction, this.images).then((result)=>{
          this.isSubmitting = false;
          if(result){
            alert("상품 등록이 완료되었습니다.")
          } else {
            alert("서버 오류입니다. 관리자에게 문의해주세요.");
          }
        })
      },
      convertToUTC(date) {
        if (!date) return '';
        const correctDate = new Date(date);
        return correctDate.toISOString().slice(0, 16);
      },
      convertToCorrecCurrentDate(){
        const offset = new Date().getTimezoneOffset() * 60000; // UTC(협정세계시)와 시스템이 속해 있는 지역의 시간의 차이인 시간대를 리턴
        const correctDate = new Date(Date.now() - offset);
        return correctDate.toISOString().slice(0, 16);
      },
      validateStartDate() {
        const startDate = new Date(this.newAuction.startDate);
        const currentDate = new Date(this.currentDateTime);

        if (startDate < currentDate) {
          alert('시작 시간은 현재 시간 이후여야 합니다.');
          this.newAuction.startDate = '';
        }
      },
      validateDueDate() {
        const startDate = new Date(this.newAuction.startDate);
        const dueDate = new Date(this.newAuction.dueDate);

        if (dueDate <= startDate) {
          alert('종료 날짜는 시작 날짜 이후여야 합니다.');
          this.newAuction.dueDate = ''; 
        }
      },
      removeImage(index) {
        this.images.splice(index, 1);
        this.imagePreviews.splice(index, 1);
      },
    },
    computed:{
      currentDateTime() {
        const currentDate = this.convertToCorrecCurrentDate();
        return currentDate;
      },

      startDateTime() {
        return this.newAuction.startDate ? this.newAuction.startDate : this.currentDateTime;
      }
    }
}

</script>

<style scoped>
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

.actionbutton {
  width: 400px;
}

input, select, textarea, button {
  display: block;
  margin-bottom: 10px;
}

.image-preview-container {
  display: flex;
  flex-wrap: wrap;
}

.image-preview {
  position: relative;
  display: inline-block;
  margin: 10px;
}

.remove-button {
  position: absolute;
  top: 5px;
  right: 5px;
  background: white; 
  border: 1px solid black;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

/* 파일 입력 필드의 기본 텍스트를 숨깁니다 */
input[type="file"]::file-selector-button {
  content: '파일 선택';
}

input[type="file"] {
  color: transparent; /* 기본 텍스트 색상을 투명하게 설정 */
}

input[type="file"]:before {
  content: '파일 선택';
  display: inline-block;
  background-color: #EEEEEE;
  color: #000000;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer; 
}

input[type="file"]::-webkit-file-upload-button {
  visibility: hidden;
}
</style>