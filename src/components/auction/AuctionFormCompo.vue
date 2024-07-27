<template>
  <form @submit="handleSubmitAuction">
    상품명<input type="text" v-model="auctionForm.itemName" required>
    카테고리 
    <select name="category" v-model="auctionForm.categoryId" required> 
        <option value="1">패션</option>
        <option value="2">가전</option>
        <option value="3">스포츠</option>
        <option value="4">수집품</option>
        <option value="5">기타</option>
    </select>
    상품 상태
    <select name="auctionProductStatus" v-model="auctionForm.auctionProductStatusId" required>
        <option value="1">중고</option>
        <option value="2">새상품</option>
        <option value="3">미개봉</option>
    </select>
    상품 위치
    <input type="text" v-model="auctionForm.location" required/>
    시작 가격 
    <input type="number" v-model="auctionForm.startPrice" required/>
    판매 기간
    <input type="datetime-local" v-model="auctionForm.startDate" :min="currentDateTime" @change="validateStartDate" required>
    <input type="datetime-local" v-model="auctionForm.dueDate" :min="startDateTime" @change="validateDueDate" required>
    설명
    <textarea v-model="auctionForm.description" maxlength="3000" required></textarea>
    <p>{{ auctionForm.description.length }} / 3000</p>
    사진 등록
    <input type="file" ref="imageFiles" multiple @change="onFileChange" accept="image/*">
    * 대표 사진을 선택해주세요.
    <div v-if="imagePreviews.length">
      <div class="image-preview-container">
        <div v-for="(image, index) in imagePreviews" :key="index" class="image-preview">
          <button type="button" class="remove-button" @click="removeImage(index)">X</button>
          <img :src="image" :alt="'미리보기 ' + (index + 1)" width="100" height="100" @click="setMainImage(index)">
            <label id="main-image-label" v-if="mainImageIndex === index">대표 사진</label>
        </div>
      </div>
    </div>
    <button type="submit" :disabled="isSubmitting"><slot name="submitBtn"></slot></button>
  </form>
</template>

<script>
import axios from 'axios';
import _ from 'lodash';

const registerAuction = async (auctionForm, images, mainImageIndex) => {
  const formData = new FormData();
      
  formData.append('newAuction', JSON.stringify(auctionForm));

  images.forEach((image) => {
    formData.append('images', image);
  });

  formData.append("mainImageIndex", mainImageIndex);
  console.log(formData.get('mainImageIndex'));
  console.log(typeof(formData.get('mainImageIndex')));

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

const updateAuction = async (auctionForm, images, mainImageIndex, deletedImages, initialAuctionData, initialMainImageIndex) => {
  const formData = new FormData();
  
  // 변경된 필드만 포함한 객체 생성
  const updatedFields = {auctionId:auctionForm.auctionId};
  let hasUpdatedFields = false;

  for (const key in auctionForm) {
    console.log('Checking key:', key);
    console.log('auctionForm[key]:', auctionForm[key]);
    console.log('initialAuctionData[key]:', initialAuctionData[key]);
    if (auctionForm[key] !== initialAuctionData[key]) {
      updatedFields[key] = auctionForm[key];
      hasUpdatedFields = true;
    } 
    
  }
  console.log(updatedFields);

  if (hasUpdatedFields) {
    formData.append('modifiedAuction', JSON.stringify(updatedFields));
  }
  
  images.forEach((image) => {
    if(image instanceof File){
      formData.append('newImages', image);
    }
  });

  if (deletedImages && deletedImages.length > 0) {
    formData.append('deletedImages', JSON.stringify(deletedImages));
  }

  console.log(initialMainImageIndex);
  console.log(mainImageIndex);
  if (initialMainImageIndex !== mainImageIndex){
    formData.append("mainImageIndex", mainImageIndex);
  }

  try {
    const res = await axios.put(`/auctions/${auctionForm.auctionId}`, formData, {
      withCredentials: true,
    });

    if (res.status === 200) {
      return true;
    } else {
      console.log(res.statusText);
      return false;
    }
  } catch(error) {
    console.error('Error:', error);
    return false;
  }
}
export default {
  props:[
    'initialAuctionData',
    'initialMainImageIndex',
    'initialAuctionImages',
    'isEditMode',
  ],
  data(){
    return {
      auctionForm: {
        auctionId: '',
        itemName: '',
        categoryId: null,
        auctionProductStatusId: null,
        location: '',
        startPrice: 0,
        startDate: '',
        dueDate: '',
        description: '',
      },
      images : [],
      imagePreviews: [], // 이미지 미리보기
      newImagePreviews: [],
      deletedImages:[],
      mainImageIndex: null,
      isSubmitting: false,
    }
  },
    mounted() {
      console.log('Initial auction data:', this.initialAuctionData);
      console.log('Initial images:', this.initialAuctionImages);
      console.log('Initial main image index:', this.initialMainImageIndex);
      if (this.isEditMode) {
        this.auctionForm = _.cloneDeep(this.initialAuctionData);
        this.images = _.cloneDeep(this.initialAuctionImages);
        this.imagePreviews = _.cloneDeep(this.initialAuctionImages);
        this.auctionForm.startDate = this.formatToDatetimeLocal(this.initialAuctionData.startDate);
        this.auctionForm.dueDate = this.formatToDatetimeLocal(this.initialAuctionData.dueDate);
        this.mainImageIndex = this.initialMainImageIndex;
        console.log('Formatted auction data:', this.auctionForm);
      }
      
    },
    methods:{
      onFileChange(event) {
        const selectedFiles = Array.from(this.$refs.imageFiles.files);
        let totalFiles = 0;

        totalFiles = this.images.length + selectedFiles.length;

        if (totalFiles > 10) {
          alert('이미지는 최대 10장까지 추가할 수 있습니다.');
          event.target.value = null;
          return;
        }

        selectedFiles.forEach(file => {
          this.imagePreviews.push(URL.createObjectURL(file));
        });

        this.images = [...this.images, ...selectedFiles];
        event.target.value = null;
      },
      handleSubmitAuction(e){
        
        e.preventDefault();

        if (this.imagePreviews.length === 0){
          alert("사진은 한 장 이상 등록해야합니다.");
          return;
        }
        if (this.mainImageIndex == null){
          alert("대표 사진을 선택해주세요.");
          return;
        }

        this.isSubmitting = true;

        this.auctionForm.startDate = this.convertToUTC(this.auctionForm.startDate);
        this.auctionForm.dueDate = this.convertToUTC(this.auctionForm.dueDate);

        if(!this.isEditMode){
          registerAuction(this.auctionForm, this.images, this.mainImageIndex).then((result)=>{
            this.isSubmitting = false;
            if(result){
              alert("상품 등록이 완료되었습니다.")
            } else {
              alert("서버 오류입니다. 관리자에게 문의해주세요.");
            }
          })
        } else {
          const changedMainImageIndex = this.mainImageIndex ;
          updateAuction(this.auctionForm, this.images, changedMainImageIndex, this.deletedImages, this.initialAuctionData, this.initialMainImageIndex).then((result)=>{
            this.isSubmitting = false;
            if(result){
              alert("상품 수정이 완료되었습니다.")
            } else {
              alert("서버 오류입니다. 관리자에게 문의해주세요.");
            }
          })
        }
      },
      convertToUTC(date) {
        if (!date) return '';
          const localDate = new Date(date);
          const utcDate = new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000);
          return utcDate.toISOString().slice(0, 16);
        },
      convertToCorrecCurrentDate(){
        const offset = new Date().getTimezoneOffset() * 60000; // UTC(협정세계시)와 시스템이 속해 있는 지역의 시간의 차이인 시간대를 리턴
        const correctDate = new Date(Date.now() - offset);
        return correctDate.toISOString().slice(0, 16);
      },
      validateStartDate() {
        const startDate = new Date(this.auctionForm.startDate);
        const currentDate = new Date(this.currentDateTime);

        if (startDate < currentDate) {
          alert('시작 시간은 현재 시간 이후여야 합니다.');
          this.auctionForm.startDate = '';
        }
      },
      validateDueDate() {
        const startDate = new Date(this.auctionForm.startDate);
        const dueDate = new Date(this.auctionForm.dueDate);

        if (dueDate <= startDate) {
          alert('종료 날짜는 시작 날짜 이후여야 합니다.');
          this.auctionForm.dueDate = ''; 
        }
      },
      removeImage(index) {
        console.log(index);
        const removedImage = this.imagePreviews[index];
        this.images.splice(index, 1);
        this.imagePreviews.splice(index, 1);
        this.deletedImages.push(removedImage);

        if (this.mainImageIndex == index) {
          this.mainImageIndex = null;
        } 
        console.log(this.mainImageIndex);
      },
      setMainImage(index) {
        // if (this.isEditMode){
        //   this.mainImageIndex = index-(this.imagePreviews.length-this.images.length);
        // } else {
        //   this.mainImageIndex = index;
        // }
        this.mainImageIndex = index;
        console.log(this.mainImageIndex);
      },
      formatToDatetimeLocal(dateString) {
      const date = new Date(dateString);
      const offset = date.getTimezoneOffset(); // 분 단위로 시간대 오프셋을 가져옵니다.
      const localDate = new Date(date.getTime() + offset * 60000); // 오프셋을 고려하여 로컬 시간으로 변환합니다.

      // 'yyyy-MM-ddThh:mm' 형식으로 변환
      const year = localDate.getFullYear();
      const month = String(localDate.getMonth() + 1).padStart(2, '0');
      const day = String(localDate.getDate()).padStart(2, '0');
      const hours = String(localDate.getHours()).padStart(2, '0');
      const minutes = String(localDate.getMinutes()).padStart(2, '0');

      return `${year}-${month}-${day}T${hours}:${minutes}`;
    }

    },
    computed:{
      currentDateTime() {
        const now = new Date();
        const utcDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
        return utcDate.toISOString().slice(0, 16);
      },

      startDateTime() {
        return this.auctionForm.startDate ? this.auctionForm.startDate : this.currentDateTime;
      }
    }
}

</script>

<style scoped>
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
  margin: 7px;
}
.remove-button {
  position: absolute;
  top: 5px;
  right: 5px;
  background: white; 
  border: 2px solid black;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
#main-image-label {
  position: absolute;
  bottom: 20px;
  right: 15px;
  height: 20px;
  width: 100px;
  color: white;
  text-align:center;
  font-size: 15px;
  background-color: #000;
  opacity:0.5; 
}
</style>