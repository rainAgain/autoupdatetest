# autoupdater

electron-updater 自动更新 demo

适用于 window 环境

## 参考链接：

1、[electron-updater-example](https://github.com/iffy/electron-updater-example)

2、[how-do-i-save-a-downloaded-update-to-install-later](https://stackoverflow.com/questions/44012988/how-do-i-save-a-downloaded-update-to-install-later)

3、[auto-update](https://www.electron.build/auto-update)

4、[electron-builder](https://www.electron.build)

## 步骤

### 第一步

在 package.json 中添加如下代码 ( 对应写自己github的地址和项目名称 ) ：

```
{
     ...
     "build": {
         "publish": [{
             "provider": "github",
             "owner": "rainagain",
             "repo": "autoupdatetest"
         }],
         ...
     }
 }
```

### 第二步

https://github.com/settings/tokens/new 打开这个网址生成一个新的令牌（记下来）,

并给予 `repo` 的全部权限，其他的可以自己选择（我除了删除的没选，其他的都选了）。

在 window 中，打开powershell ,输入如下:

```
[Environment]::SetEnvironmentVariable("GH_TOKEN","<刚刚生成生成的令牌ID>","User")
```

### 第三步

在 package.json 中添加如下代码：

```
{
    ...
    "win": {
	  "target": [
	    "nsis"	//打包成nsis格式的exe
	  ]
	},
	"nsis": {
	  "oneClick": false,
	  "allowElevation": true,
	  "allowToChangeInstallationDirectory": true,	//允许用户选择安装目录，这个为true时，oneClick要为false
	  "menuCategory": true,
	  "installerIcon": "./res/icon.ico",
	  "uninstallerIcon": "./res/icon.ico"
	}
}

```

[配置链接](https://www.electron.build/configuration/nsis)

### 第四步
 
在 package.json 的 script 对象中 添加：

```
"publish": "build --win -p always"
```

并修改对应的 `version`,比如 1.0.6

执行 

```
npm run publish
```

### 第五步

在 https://github.com/rainAgain/autoupdatetest/releases 中找到刚刚发布的草稿（Draft），

点击publish release 绿色按钮，发布成功。

### 第六步

修改 package.json 中的 'version',比上面的版本低，比如 1.0.1, 在 script 对象中添加：

```
"build": "electron-builder ./"
```

执行：

```
npm run build
```

会在本地生成一个 1.0.1 版本的 exe, 双击进行安装。

会看到有安装进度，一直到下载完后会自动关闭应用,并出现安装的弹窗，让你选择安装路径，默认

会出现上次选择的安装目录，点击 “下一步” 即可。


## 注意

1、在更新的时候给个进度条，不然不知道是否在更新

2、把 demo 写的尽可能的小了测试

3、希望某些文件夹或者文件不打包入 asar 中，可以如下：

```
{
    ...
    "build": {
        "asar": true,
		"asarUnpack": [
		    "app/test",
		    "gulpfile.js",
		    "project"
		]
        ...
    }
}

```

[过滤配置](https://www.electron.build/file-patterns)