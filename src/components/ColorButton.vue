<template>
    <div 
        :class="{'bg-white': isColorActive }, {'-shadow--double': isColorActive }"
        class="rounded p-1  h-full absolute w-max flex">
        <button  
            @click="handleActive" 
            :id='bgColor' 
            :style="`backgroundColor:${bgColor}`" 
            class="-shadow--button rounded-xl w-5 h-full border-2 border-white" 
            style="">
        </button>
        <div class="h-full top-0 left-0 flex ml-3 gap-3" v-if="isColorActive">
            <button 
                v-for="btColor in showList" 
                @click="handleActive" 
                :id="btColor" 
                :style="`backgroundColor:${btColor}`" 
                class="-shadow--button rounded-xl w-5 h-full border-2 border-white"
                style=""
                >
            </button>
        </div>
    </div>
</template>

<script>
    export default{
        props:{
            canOpenColor: { type: Boolean},
            color: { type: String } ,
            changeColor: { type: Function }
        },
        data(){
            return{
                colorList: ['#F7797D', '#9BEAD2', '#FBD786'],
                bgColor: this.color,
                isActive: false,
                isColorActive: false,
            }
        },
        methods:{
            handleActive(event){
                if(!this.canOpenColor){ return } else { this.isColorActive = !this.isColorActive}
                if(!this.isActive){
                    this.changeColor(this.bgColor, false)
                    this.isActive = true
                    return
                }
                let clickedColor = event.target.id
                this.bgColor = clickedColor
                this.isActive = !this.isActive
                this.changeColor(this.bgColor, true)
            }
        },
        computed:{
            showList(){
                return this.colorList.filter( e => e !== this.bgColor )
            }
        }

    }
</script>

<style scoped>
    .bts{
        display: flex;
        position: absolute;
        gap: .5rem;
        left: calc(20px + .5rem);
        background-color: blue;
    }
</style>