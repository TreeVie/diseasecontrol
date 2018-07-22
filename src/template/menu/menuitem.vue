<template>
    <li :class="className">
        <slot></slot>
    </li>
</template>
<style lang="less">
@menu-item: ~"@{css-prefix}-menu-item";
.@{menu-item}{
    height: 54px;
    line-height: 54px;
    text-align: center;
    border-bottom: @border;
    &:hover{
        
    }
}
</style>
<script>
export default {
    name:"MenuItem",
    data(){
        return {
            className:`${prefixCls}-menu-item`
        }
    }
}
</script>

