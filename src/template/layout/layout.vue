<template>
    <div :class="className">
        <slot></slot>
    </div>
</template>
<style lang="less">
@layout-prefix : ~"@{css-prefix}-layout";

.@{layout-prefix} {
    height: 64px;
    background-color: @layout-bg-color;
    position: relative;
    &&-has-sider {
        > .@{css-prefix}-sider {
            box-sizing: border-box;
            float: left;
            clear: both;
        }
    }
}
</style>
<script>
let prefix = `${prefixCls}-layout`;

export default {
    name: "Layout",
    data() {
        return {
            hasSider: false
        };
    },
    computed: {
        // 样式
        className() {
            return [prefix, { [`${prefix}-has-sider`]: this.hasSider }];
        }
    },
    methods: {
        findSider() {
            return this.$children.some(child => {
                // return child.$$options.name === "Sider";
                return child.$options._componentTag === "Sider";
            });
        }
    },
    mounted() {
        this.findSider() && (this.hasSider = true);
    }
};
</script>


