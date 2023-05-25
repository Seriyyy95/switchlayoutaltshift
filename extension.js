/* extension.js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 */

/* exported init */

const Main = imports.ui.main;
const Meta = imports.gi.Meta;
const Shell = imports.gi.Shell;
const Gio = imports.gi.Gio; 
const Ext = imports.misc.extensionUtils.getCurrentExtension();
const SourceMgr = imports.ui.status.keyboard.getInputSourceManager();

const SETTING_KEY_SWITCH_LAYOUT = 'switch-layout';
const SCHEMA_NAME = 'org.gnome.shell.extensions.switchlayoutaltshift';

class Extension {
    constructor() {
    }

    enable() {
        let schemaDir = Ext.dir.get_child('schemas').get_path();
        let schemaSource = Gio.SettingsSchemaSource.new_from_directory(schemaDir, Gio.SettingsSchemaSource.get_default(), false);
        let schema = schemaSource.lookup(SCHEMA_NAME, false);

        this.settings = new Gio.Settings({ settings_schema: schema });
    
        Main.wm.addKeybinding(
            SETTING_KEY_SWITCH_LAYOUT,
            this.settings,
            Meta.KeyBindingFlags.NONE,
            Shell.ActionMode.ALL,
            handleKey
        );
    }

    disable() {
        Main.wm.removeKeybinding(SETTING_KEY_SWITCH_LAYOUT);
    }
}

function init() {
    return new Extension();
}

function handleKey() {
    let max = Object.keys(SourceMgr.inputSources).length - 1;
    let current = SourceMgr.currentSource.index;
    if(current < max){
        SourceMgr.inputSources[current+1].activate();
    }else{
        SourceMgr.inputSources[0].activate();
    }
}
