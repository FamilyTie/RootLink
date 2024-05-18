import { SearchPost } from "./types";
import {SearchProfile} from "./types";

export interface SearchResult {
    posts: SearchPost[];
    profiles: SearchProfile[];
}

