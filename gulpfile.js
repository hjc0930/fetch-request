const gulp = require("gulp");
const babel = require("gulp-babel");
const ts = require("gulp-typescript");
const { deleteSync } = require("del");

gulp.task("clean", async () => {
  return deleteSync(["lib/**", "es/**", "dist/**"]);
});

gulp.task("es", () => {
  const tsProject = ts.createProject("tsconfig.pro.json", {
    module: "ESNext",
  });
  return tsProject.src().pipe(tsProject()).pipe(gulp.dest("es/"));
});

gulp.task("cjs", () => {
  return gulp
    .src(["./es/**/*.js"])
    .pipe(
      babel({
        configFile: "./.babelrc",
      })
    )
    .pipe(gulp.dest("lib/"));
});

gulp.task("declaration", () => {
  const tsProject = ts.createProject("tsconfig.pro.json", {
    declaration: true,
    emitDeclarationOnly: true,
  });
  return tsProject
    .src()
    .pipe(tsProject())
    .pipe(gulp.dest("es/"))
    .pipe(gulp.dest("lib/"));
});

exports.default = gulp.series("clean", "es", "cjs", "declaration");
