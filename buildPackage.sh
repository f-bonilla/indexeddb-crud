#!/bin/sh

#######################################################
####	Build component files in 'src' directory.
####	e.g.:
####	bash buildPackage.sh
####	# user entry
####	mainMenu.user.profile
####	# directories and files created:
####	main-menu/user/profile
####		profile.js
####		profile.styles.js
####		profile.test.js
#######################################################

function exit_script {
	echo -e "\n----------------------------------------"
	#print all arguments
	echo $@
	echo -e "----------------------------------------\n"
	exit 1
}
function array_join_by {
  local d=${1-} f=${2-}
  if shift 2; then
    printf %s "$f" "${@/#/$d}"
  fi
}
function str_to_kebab-kase {
	echo $1 | sed -r 's/([a-z0-9])([A-Z])/\1-\2/g' | tr '[:upper:]' '[:lower:]'	
}
function spinal_to_upper {
    IFS=- read -ra str <<<"$1"
    printf '%s' "${str[@]^}"
}

echo "Type the path(camelCase) to the component separated by '.' and press [ENTER], ejem:
mainMenu.users.profile"
## get user package
read userPackage

## no user input, exit program
if [ -z "$userPackage" ]
then
  exit_script "You must enter a valid component name, e.g.: 'mainMenu.users.profile'."
fi

## goto "src" directory(create it if it does not exist)
appDirectory="src/"
if ! [ -d $appDirectory ]
then
	mkdir src
fi
cd $appDirectory

## remove interior spaces in userPackage
userPackage=${userPackage// /}
echo "userPackage -> "$userPackage

## package string split by "." into array 'folders'
IFS='.' read -r -a folders <<< "$userPackage"
## get last element(component name)
componentName="${folders[${#folders[@]}-1]}"
componentNameCamelCase=$componentName
## component class name in PascalCase
componentName=${componentName^}
## file name in kebab-case
fileName=$(str_to_kebab-kase $componentName)
webComponentTagName="bl-"$fileName
echo "componentName -> "$componentName
echo "webComponentTagName -> "$webComponentTagName
echo "fileName -> "$fileName

## save root path
foldersLength=${#folders[*]}
rootPath=""
for ((i=0; i<$foldersLength; i++)); do rootPath+="../"; done
echo "rootPath = "$rootPath

## all folders in kebab-case
count=0
for i in "${folders[@]}"
do
	folders[$count]=$(str_to_kebab-kase $i)
	count=$((count + 1))
done

## extracts from "userPackage" a series of values, class name, 
## directory and file names, css class names...
bemName=$(array_join_by '__' ${folders[*]})
# kebabCaseName=$(str_to_kebab-kase $userPackage)
# kebabCaseName=${kebabCaseName//[\.]/-}
pascalCaseName=$(spinal_to_upper $kebabCaseName)

packagePath=$(array_join_by '/' ${folders[*]})

echo "-------------------------------"
# echo "bemName -> "$bemName
# echo "kebabCaseName -> "$kebabCaseName
# echo "pascalCaseName -> "$pascalCaseName
echo "packagePath-> "$packagePath

## if the folder does not exist, the component is created
## if the folder exists but does not contain a component
##   the component is created
if [ -d $packagePath ]
then
	## folder exists
	if [ -f $packagePath/$fileName".js" ]
	then
		## the component has already been created
		exit_script "ERROR: The component '"$componentName"' already exists in the directory: "$packagePath
	fi
else
	## build folder
  mkdir -p $packagePath
fi

## goto folder
cd $packagePath

TAB='\t';
LINE_BREAK='\n';

## style
file=$fileName".styles.js"
touch $file
str=""
str=$str"import {css} from 'lit';"$LINE_BREAK$LINE_BREAK
str=$str"export const styles = ["$LINE_BREAK
str=$str$TAB"css\`"$LINE_BREAK
str=$str$TAB$TAB":host {"$LINE_BREAK
str=$str$TAB$TAB$TAB"contain: content;"$LINE_BREAK
str=$str$TAB$TAB$TAB"display: flex;"$LINE_BREAK
str=$str$TAB$TAB"}"$LINE_BREAK
str=$str$TAB"\`,"$LINE_BREAK
str=$str"];"$LINE_BREAK
echo -e $str >> $file

## component
file=$fileName".js"
touch $file
str=""
str=$str"import { LitElement, html } from 'lit';"$LINE_BREAK
str=$str"// import i18next from 'i18next';"$LINE_BREAK
str=$str"import {styles} from './$fileName.styles.js';"$LINE_BREAK
str=$str"// import {default as c} from \"$rootPath""constants.js\";"$LINE_BREAK
str=$str"// import EventHandler from \"$rootPath""event-handler.js\";"$LINE_BREAK
str=$str"// import EventNames from \"$rootPath""event-names.js\";"$LINE_BREAK$LINE_BREAK

str=$str"class "$componentName" extends LitElement {"$LINE_BREAK
str=$str$TAB"static styles = styles;"$LINE_BREAK$LINE_BREAK

str=$str$TAB"static get properties() {"$LINE_BREAK
str=$str$TAB$TAB"return {"$LINE_BREAK
str=$str$TAB$TAB$TAB"publicProperty: { type: String, attribute: false },"$LINE_BREAK
str=$str$TAB$TAB"}"$LINE_BREAK
str=$str$TAB"}"$LINE_BREAK$LINE_BREAK

str=$str$TAB"constructor() {"$LINE_BREAK
str=$str$TAB$TAB"super();"$LINE_BREAK
str=$str$TAB$TAB"this.addListeners();"$LINE_BREAK
str=$str$TAB"}"$LINE_BREAK$LINE_BREAK

str=$str$TAB"connectedCallback() {"$LINE_BREAK
str=$str$TAB$TAB"super.connectedCallback();"$LINE_BREAK
str=$str$TAB"}"$LINE_BREAK$LINE_BREAK

str=$str$TAB"update(changed) {"$LINE_BREAK
str=$str$TAB$TAB"super.update(changed);"$LINE_BREAK
str=$str$TAB"}"$LINE_BREAK$LINE_BREAK

str=$str$TAB"updated(changed) {"$LINE_BREAK
str=$str$TAB$TAB"super.updated(changed);"$LINE_BREAK
str=$str$TAB"}"$LINE_BREAK$LINE_BREAK

str=$str$TAB"firstUpdated() {"$LINE_BREAK
str=$str$TAB$TAB"super.firstUpdated();"$LINE_BREAK
str=$str$TAB"}"$LINE_BREAK$LINE_BREAK

str=$str$TAB"disconnectedCallback() {"$LINE_BREAK
str=$str$TAB$TAB"super.disconnectedCallback();"$LINE_BREAK
str=$str$TAB$TAB"this.removeListeners();"$LINE_BREAK
str=$str$TAB"}"$LINE_BREAK$LINE_BREAK

str=$str$TAB"langChangeHandler() {"$LINE_BREAK
str=$str$TAB$TAB"this.requestUpdate();"$LINE_BREAK
str=$str$TAB"}"$LINE_BREAK$LINE_BREAK

str=$str$TAB"addListeners() {"$LINE_BREAK
str=$str$TAB$TAB"// this.boundLangChangedHandler = this.langChangeHandler;"$LINE_BREAK
str=$str$TAB$TAB"// EventHandler.on(EventNames.LANG_CHANGED, this.boundLangChangedHandler.bind(this))"$LINE_BREAK
str=$str$TAB"}"$LINE_BREAK$LINE_BREAK

str=$str$TAB"removeListeners() {"$LINE_BREAK
str=$str$TAB$TAB"// EventHandler.off(EventNames.LANG_CHANGED, this.boundLangChangedHandler);"$LINE_BREAK
str=$str$TAB"}"$LINE_BREAK$LINE_BREAK

str=$str$TAB"render() {"$LINE_BREAK
str=$str$TAB$TAB"return html\`<div>$componentName</div>\`;"$LINE_BREAK
str=$str$TAB"}"$LINE_BREAK$LINE_BREAK
str=$str"};"$LINE_BREAK$LINE_BREAK

str=$str"customElements.define(\"$webComponentTagName\", $componentName);"$LINE_BREAK
echo -e $str >> $file

## test
file=$fileName".test.js"
touch $file
str=""
str=$str"import { html } from 'lit';"$LINE_BREAK
str=$str"import { fixture, expect } from '@open-wc/testing';"$LINE_BREAK
str=$str"import \"./$fileName.js\";"$LINE_BREAK$LINE_BREAK
str=$str"describe('"$componentName" created', ()=>{"$LINE_BREAK
str=$str$TAB"let el;"$LINE_BREAK$LINE_BREAK
str=$str$TAB"beforeEach(async () => {"$LINE_BREAK
str=$str$TAB$TAB"el = await fixture(html\`<$webComponentTagName></$webComponentTagName>\`);"$LINE_BREAK
str=$str$TAB$TAB"await el.updateComplete;"$LINE_BREAK
str=$str$TAB"});"$LINE_BREAK$LINE_BREAK
str=$str$TAB"it('renders a div', () => {"$LINE_BREAK
str=$str$TAB$TAB"const div = el.shadowRoot.querySelector('div');"$LINE_BREAK
str=$str$TAB$TAB"expect(div).to.exist;"$LINE_BREAK
str=$str$TAB$TAB"expect(div.textContent).to.equal('$componentName');"$LINE_BREAK
str=$str$TAB"});"$LINE_BREAK$LINE_BREAK
str=$str$TAB"it('passes the a11y audit', async () => {"$LINE_BREAK
str=$str$TAB$TAB"await expect(el).shadowDom.to.be.accessible();"$LINE_BREAK
str=$str$TAB"});"$LINE_BREAK
str=$str"});"$LINE_BREAK
echo -e $str >> $file

exit_script "Component '"$componentName"' created."
