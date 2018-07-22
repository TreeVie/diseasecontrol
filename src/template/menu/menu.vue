<template>
    <ul :class="className" :style="styles">
        <slot></slot>
    </ul>
</template>

<style lang="less">
@prefix : ~"@{css-prefix}-menu";

.@{prefix} {
    width: 200px;
    background-color: @menu-bg-color;
    border:@border
}
</style>

<script>
export default {
    name:"Menu",
    props:{
        mode:{
            type:String,
            default:"vertical" // vertical | "horizon"
        },
        styles:{
            type: String,
            default: ""
        }
    },
    data(){
        return {
            className:`${prefixCls}-menu`
        }
    }
}
</script>

