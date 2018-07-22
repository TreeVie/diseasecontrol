<template>
    <Layout>
        <Header>
            <div class="logo"></div>
        </Header>
        <div><p>Hello Vue</p></div>
        <Menu>
            <menu-item>123</menu-item>
            <menu-item>456</menu-item>
            <menu-item>789</menu-item>
        </Menu>
    </Layout>
</template>
<style lang="less">
    .logo{
        float: left;
        height: 64px;
        width: 200px;
        background: url(../../assets/image/logo.png) center center no-repeat
    }
</style>

<script>
import Layout from '../../template/layout'
import Menu from '../../template/menu'
export default {
    name:"Demo",
    props:{
        name:{
            type:String,
            default:'demo'
        }
    },
    components:{
        Layout,
        Header:Layout.Header,
        Menu,
        MenuItem:Menu.MenuItem
    }
}
</script>

