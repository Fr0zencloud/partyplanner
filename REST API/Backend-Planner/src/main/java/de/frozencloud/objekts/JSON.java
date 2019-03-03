package de.frozencloud.objekts;

import java.util.HashMap;

public class JSON {

    private String jsonstring;
    private HashMap<String, String> jsonlist = new HashMap<String, String>();

    public JSON() {
        this.jsonstring = "";
    }
    public void addArgument(String key, String value) {
        if(!jsonlist.containsKey(key)) {
            jsonlist.put(key, value);
        }
    }
    public void removeArgument(String key) {
        if(jsonlist.containsKey(key)) {
            jsonlist.remove(key);
        }
    }
    public void resetJson() {
        this.jsonlist.clear();
    }
    public String build() {
        try {
            String prefix = "{";
            String suffix = "}";
            String endstring = prefix;
            int i = 0;
            for(String key : jsonlist.keySet()) {
                String value = jsonlist.get(key);
                if(i != (jsonlist.size() -1)) {
                    if(value != null && value.equalsIgnoreCase("true") || value.equalsIgnoreCase("false")) {
                        endstring = endstring + "\"" + key + "\": " + value + ", \n";
                    } else {
                        endstring = endstring + "\"" + key + "\": \"" + value + "\", \n";
                    }
                } else {
                    if(value != null && value.equalsIgnoreCase("true") || value.equalsIgnoreCase("false")) {
                        endstring = endstring + "\"" + key + "\": " + value + "";
                    } else {
                        endstring = endstring + "\"" + key + "\": \"" + value + "\"";
                    }
                }
                i++;
            }
            endstring = endstring + suffix;
            return endstring;
        } catch(Exception e) {
            return "{\n\"error\": true\n}";
        }
    }
}
