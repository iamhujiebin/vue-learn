<template>
  <div class="nav-breadcrumb-wrap">
    <div class="container">
      <nav class="nav-breadcrumb">
        <a href="/">Home</a>
        <slot name="bread"></slot> <!--放一个插槽，可以让外面动态插入数据-->
        <slot name="bread2"></slot> <!--放一个插槽，可以让外面动态插入数据-->
      </nav>
    </div>
  </div>
</template>
