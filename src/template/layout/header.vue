<template>
    <div :class="className" :style="styles">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: "Header",
    props: {
        styles: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            className: prefixCls + "-header"
        };
    }
};
</script>
<style lang="less">
@prefix : ~"@{css-prefix}-header";

.@{prefix} {
    height: 64px;
    background-color: @header-bg-color;
}
</style>


