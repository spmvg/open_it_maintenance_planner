<template>
    <div>
      <nav class="navbar navbar-dark navbar-expand-xl">
        <a href="/" class="ms-4 navbar-brand brand-flex">
          <h1 class="brand-title">Open IT Maintenance Planner</h1>
        </a>
        <button class="navbar-toggler mx-4"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarcollapseid">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse mx-3"
             id="navbarcollapseid">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link to="/" class="mx-1 nav-link" exact-active-class="active">
                HOME
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/faq" class="mx-1 nav-link" exact-active-class="active">
                FAQ
              </router-link>
            </li>
            <li class="nav-item">
              <a href="https://github.com/spmvg/open_it_maintenance_planner" class="nav-link" target="_blank" rel="noopener" title="GitHub">
                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5.315 2.1c.791 -.113 1.9 .145 3.333 .966l.272 .161l.16 .1l.397 -.083a13.3 13.3 0 0 1 4.59 -.08l.456 .08l.396 .083l.161 -.1c1.385 -.84 2.487 -1.17 3.322 -1.148l.164 .008l.147 .017l.076 .014l.05 .011l.144 .047a1 1 0 0 1 .53 .514a5.2 5.2 0 0 1 .397 2.91l-.047 .267l-.046 .196l.123 .163c.574 .795 .93 1.728 1.03 2.707l.023 .295l.007 .272c0 3.855 -1.659 5.883 -4.644 6.68l-.245 .061l-.132 .029l.014 .161l.008 .157l.004 .365l-.002 .213l-.003 3.834a1 1 0 0 1 -.883 .993l-.117 .007h-6a1 1 0 0 1 -.993 -.883l-.007 -.117v-.734c-1.818 .26 -3.03 -.424 -4.11 -1.878l-.535 -.766c-.28 -.396 -.455 -.579 -.589 -.644l-.048 -.019a1 1 0 0 1 .564 -1.918c.642 .188 1.074 .568 1.57 1.239l.538 .769c.76 1.079 1.36 1.459 2.609 1.191l.001 -.678l-.018 -.168a5.03 5.03 0 0 1 -.021 -.824l.017 -.185l.019 -.12l-.108 -.024c-2.976 -.71 -4.703 -2.573 -4.875 -6.139l-.01 -.31l-.004 -.292a5.6 5.6 0 0 1 .908 -3.051l.152 -.222l.122 -.163l-.045 -.196a5.2 5.2 0 0 1 .145 -2.642l.1 -.282l.106 -.253a1 1 0 0 1 .529 -.514l.144 -.047l.154 -.03z" /></svg>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
</template>
<script>
  export default {
    name: 'NavBar',
  }

</script>

<style scoped>
h1 {
  font-size: 25px;
  color: #e6e6e6;
  font-family: "Open Sans", sans-serif;
  font-weight: bold;
}

nav {
  background: #23272e !important;
  color: #e6e6e6;
  border: none;
  box-shadow: none;
}

.navbar-brand {
  color: #e6e6e6 !important;
  font-family: "Open Sans", sans-serif;
  font-weight: bold;
  font-size: 1.3rem;
}

.nav-link {
  font-family: "Open Sans", sans-serif;
  font-size: 1.1rem;
  font-weight: bold;
  color: #e6e6e6 !important;
  background: transparent;
  border-radius: 8px;
  padding: 6px 18px;
  margin: 0 2px;
  transition: background 0.2s, color 0.2s;
  text-decoration: none;
  display: flex;
  align-items: center;
}
.nav-link:hover, .nav-link:focus {
  background: #2a3550;
  color: #7ecfff !important;
}
.router-link-exact-active, .nav-link.active {
  color: #7ecfff !important;
  background: #2a3550;
}
.navbar-toggler {
  border: none;
  background: #2a3550;
  color: #e6e6e6;
  border-radius: 8px;
  padding: 6px 12px;
  margin-left: 8px;
}
.navbar-toggler:focus {
  outline: none;
  box-shadow: 0 0 0 2px #7ecfff44;
}
.navbar-nav {
  align-items: center;
}
/* Make logo and h1 inline and vertically centered */
.brand-flex {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
}
.brand-logo {
  display: block;
}
.brand-title {
  margin: 0;
  padding: 0;
  line-height: 1;
  color: #e6e6e6;
}
</style>

